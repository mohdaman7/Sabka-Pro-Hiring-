# 📋 Interview Data Migration Guide

## Overview

This guide explains how to migrate existing interview data from the Application model (embedded documents) to the new Interview model (separate collection).

---

## 🎯 What This Migration Does

1. **Finds** all Application documents that have `interview` data
2. **Creates** new Interview documents with proper structure
3. **Maps** old interview fields to new Interview model schema
4. **Preserves** all interview history and metadata
5. **Optionally cleans up** old interview data from Application documents

---

## 🚀 Quick Start

### 1. **Dry Run (Preview Changes)**

Always start with a dry run to see what will be migrated:

```bash
cd backend
node src/scripts/migrateInterviews.js --dry-run
```

This will show you:
- How many applications have interview data
- Preview of first 5 interviews to be migrated
- No changes will be made to the database

### 2. **Run Migration (Interactive)**

Run the migration with confirmation prompts:

```bash
node src/scripts/migrateInterviews.js
```

You'll be asked to:
- Confirm the migration
- Choose whether to cleanup old interview data

### 3. **Run Migration (Force Mode)**

Skip all prompts and run automatically:

```bash
node src/scripts/migrateInterviews.js --force
```

⚠️ **Warning:** This will migrate immediately without confirmation!

---

## 📊 Migration Process

### Step-by-Step Flow:

```
1. Connect to MongoDB
   ↓
2. Find applications with interview data
   ↓
3. Check for existing Interview documents
   ↓
4. Preview migration (show sample data)
   ↓
5. Confirm migration (unless --force)
   ↓
6. Create Interview documents
   ↓
7. Optional: Cleanup application.interview fields
   ↓
8. Display results
```

---

## 🗺️ Data Mapping

### Old Structure (Application.interview):
```javascript
{
  interview: {
    scheduledAt: Date,
    timezone: String,
    durationMinutes: Number,
    type: String,
    meetingLink: String,
    location: String,
    panel: [{
      name: String,
      email: String,
      role: String
    }],
    notes: String,
    status: String,
    feedback: String,
    history: [...]
  }
}
```

### New Structure (Interview Document):
```javascript
{
  applicationId: ObjectId,
  jobId: ObjectId,
  candidateId: ObjectId,
  employerId: ObjectId,
  
  title: String,
  scheduledAt: Date,
  timezone: String,
  durationMinutes: Number,
  type: String,
  
  meetingLink: String,
  location: {
    address: String,
    instructions: String
  },
  
  interviewers: [{
    name: String,
    email: String,
    role: String,
    isPrimary: Boolean
  }],
  
  status: String,
  round: Number,
  stage: String,
  notes: String,
  
  evaluation: {
    feedback: String,
    recommendation: String
  },
  
  history: [{
    action: String,
    timestamp: Date,
    performedBy: ObjectId,
    reason: String
  }],
  
  createdBy: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔍 Field Mapping Details

| Old Field | New Field | Notes |
|-----------|-----------|-------|
| `interview.scheduledAt` | `scheduledAt` | Direct copy |
| `interview.timezone` | `timezone` | Default: 'UTC' |
| `interview.durationMinutes` | `durationMinutes` | Default: 60 |
| `interview.type` | `type` | Direct copy |
| `interview.meetingLink` | `meetingLink` | Direct copy |
| `interview.location` | `location.address` | Converted to object |
| `interview.panel` | `interviewers` | Renamed and restructured |
| `interview.notes` | `notes` + `location.instructions` | Copied to both |
| `interview.status` | `status` | Direct copy |
| `interview.feedback` | `evaluation.feedback` | Moved to evaluation object |
| `interview.history` | `history` | Restructured with action types |

### Auto-Generated Fields:
- `applicationId` - From application._id
- `jobId` - From application.jobId
- `candidateId` - From application.studentId
- `employerId` - From application.employerId
- `title` - Generated as "Interview for {Job Title}"
- `stage` - Derived from interview type
- `round` - Default: 1
- `createdBy` - Set to employerId

---

## 📝 Example Output

### Dry Run Output:
```
============================================================
INTERVIEW DATA MIGRATION SCRIPT
============================================================

🔍 DRY RUN MODE - No changes will be made to the database

✓ Connected to MongoDB
  Database: sabka-pro-hiring

Searching for applications with interview data...
✓ Found 15 applications with interview data

Checking for existing Interview documents...
✓ No existing Interview documents found

============================================================
MIGRATION PREVIEW (DRY RUN)
============================================================

Total applications to migrate: 15

1. Application ID: 507f1f77bcf86cd799439011
   Job: Senior React Developer
   Candidate: John Doe
   Scheduled: 11/5/2025, 2:00:00 PM
   Type: video
   Status: scheduled

2. Application ID: 507f1f77bcf86cd799439012
   Job: Backend Engineer
   Candidate: Jane Smith
   Scheduled: 11/6/2025, 10:30:00 AM
   Type: technical
   Status: completed

... and 13 more

✓ Dry run complete. Use without --dry-run to perform migration.
```

### Actual Migration Output:
```
============================================================
PERFORMING MIGRATION
============================================================

✓ Migrated: 507f1f77bcf86cd799439011 → Senior React Developer
✓ Migrated: 507f1f77bcf86cd799439012 → Backend Engineer
✓ Migrated: 507f1f77bcf86cd799439013 → Full Stack Developer
⊘ Skipped: 507f1f77bcf86cd799439014 (Interview already exists)
✓ Migrated: 507f1f77bcf86cd799439015 → DevOps Engineer

============================================================
MIGRATION RESULTS
============================================================

✓ Successfully migrated: 14
⊘ Skipped (already exists): 1
✗ Failed: 0

============================================================
CLEANUP (OPTIONAL)
============================================================

Do you want to remove interview data from Application documents?
This will set application.interview to undefined for migrated applications.

Cleanup application.interview fields? (yes/no): yes

✓ Cleaned up 14 applications

✓ Migration complete!
```

---

## ⚠️ Important Notes

### Before Migration:

1. **Backup Your Database**
   ```bash
   mongodump --db sabka-pro-hiring --out ./backup-$(date +%Y%m%d)
   ```

2. **Run in Development First**
   - Test the migration on a development database
   - Verify the migrated data is correct
   - Check that your application works with the new structure

3. **Check Dependencies**
   - Ensure all code is updated to use Interview model
   - Update any queries that reference `application.interview`

### During Migration:

1. **Stop Your Application**
   - Prevent new interviews from being created during migration
   - Avoid race conditions

2. **Monitor Progress**
   - Watch for errors in the console
   - Check the success/skip/error counts

3. **Verify Results**
   - Query Interview collection to verify documents
   - Check a few random interviews manually

### After Migration:

1. **Verify Data**
   ```javascript
   // In MongoDB shell or Compass
   db.interviews.countDocuments()
   db.interviews.findOne()
   ```

2. **Test Application**
   - Student interviews page should show all interviews
   - ATS Management should display interviews
   - Scheduling new interviews should work

3. **Optional Cleanup**
   - If everything works, you can remove interview fields from Application schema
   - Update any remaining code that references `application.interview`

---

## 🔧 Troubleshooting

### Issue: "No applications with interview data found"
**Solution:** Check if your applications actually have interview data:
```javascript
db.applications.find({ "interview.scheduledAt": { $exists: true } }).count()
```

### Issue: "Interview already exists" warnings
**Solution:** This is normal if you've run the migration before. The script skips duplicates automatically.

### Issue: Migration fails with validation errors
**Solution:** Check the error message. Common issues:
- Missing required fields (jobId, candidateId, employerId)
- Invalid date formats
- Missing populated data

### Issue: Some interviews are missing after migration
**Solution:** 
1. Check the error log in migration output
2. Run with `--dry-run` to see which applications will be migrated
3. Manually inspect problematic applications

---

## 🧪 Testing the Migration

### 1. Count Before Migration:
```javascript
// Applications with interviews
db.applications.countDocuments({ "interview.scheduledAt": { $exists: true } })

// Existing Interview documents
db.interviews.countDocuments()
```

### 2. Run Migration:
```bash
node src/scripts/migrateInterviews.js
```

### 3. Count After Migration:
```javascript
// Should match the number of migrated applications
db.interviews.countDocuments()

// Verify structure
db.interviews.findOne()
```

### 4. Test Application:
- Visit student interviews page
- Visit ATS Management → Interview Scheduler
- Schedule a new interview
- Verify all data displays correctly

---

## 🔄 Rolling Back

If you need to rollback the migration:

### 1. Restore from Backup:
```bash
mongorestore --db sabka-pro-hiring ./backup-YYYYMMDD/sabka-pro-hiring
```

### 2. Or Delete Migrated Interviews:
```javascript
// Delete all interviews created by migration
db.interviews.deleteMany({
  "history.reason": "Migrated from Application model"
})
```

---

## 📞 Support

If you encounter issues:

1. Check the error messages in the console
2. Review this guide for common issues
3. Verify your database connection
4. Ensure all models are properly imported
5. Check MongoDB logs for database-level errors

---

## ✅ Post-Migration Checklist

- [ ] Backup created
- [ ] Dry run completed successfully
- [ ] Migration completed without errors
- [ ] Interview count matches expected number
- [ ] Student interviews page works
- [ ] ATS Management shows interviews
- [ ] New interview scheduling works
- [ ] Old interview data cleaned up (optional)
- [ ] Application tested thoroughly
- [ ] Backup can be deleted (after verification period)

---

## 🎉 Success!

Once migration is complete and verified:
- Your interviews are now in a dedicated collection
- Better query performance
- Proper data structure for future features
- ATS Management has real interview data
- Students can see their interviews properly

**The interview system is now production-ready!** 🚀
