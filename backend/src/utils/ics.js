// Simple ICS generator for interviews
export function toICSDate(dt) {
  // dt: Date instance -> format YYYYMMDDTHHMMSSZ
  const pad = (n) => String(n).padStart(2, '0');
  const year = dt.getUTCFullYear();
  const month = pad(dt.getUTCMonth() + 1);
  const day = pad(dt.getUTCDate());
  const hour = pad(dt.getUTCHours());
  const min = pad(dt.getUTCMinutes());
  const sec = pad(dt.getUTCSeconds());
  return `${year}${month}${day}T${hour}${min}${sec}Z`;
}

export function generateInterviewICS({
  uid,
  startTime,
  endTime,
  summary,
  description,
  location,
  url,
  organizer,
  attendees = [],
}) {
  const dtStart = toICSDate(new Date(startTime));
  const dtEnd = toICSDate(new Date(endTime));
  const dtStamp = toICSDate(new Date());

  const lines = [
    'BEGIN:VCALENDAR',
    'PRODID:-//Sabka Pro//Interview Scheduler//EN',
    'VERSION:2.0',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${escapeICS(summary || 'Interview')}`,
    description ? `DESCRIPTION:${escapeICS(description)}` : undefined,
    location ? `LOCATION:${escapeICS(location)}` : undefined,
    url ? `URL:${escapeICS(url)}` : undefined,
    organizer?.name && organizer?.email
      ? `ORGANIZER;CN=${escapeICS(organizer.name)}:MAILTO:${organizer.email}`
      : undefined,
    ...attendees
      .filter(Boolean)
      .map((a) =>
        `ATTENDEE;CN=${escapeICS(a.name || a.email)};ROLE=REQ-PARTICIPANT:MAILTO:${a.email}`
      ),
    'END:VEVENT',
    'END:VCALENDAR',
  ].filter(Boolean);

  return lines.join('\r\n');
}

function escapeICS(value) {
  return String(value)
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;');
}
