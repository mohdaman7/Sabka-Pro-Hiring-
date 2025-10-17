import Vimeo from "vimeo";
import { env } from "../config/env.js";

class VimeoService {
  constructor() {
    this.client = new Vimeo.Vimeo(
      env.vimeoClientId,
      env.vimeoClientSecret,
      env.vimeoAccessToken
    );
  }

  // Upload video to Vimeo
  async uploadVideo(filePath, options = {}) {
    return new Promise((resolve, reject) => {
      this.client.upload(
        filePath,
        {
          name: options.name || "Untitled Video",
          description: options.description || "",
          privacy: {
            view: "disable", // Disable public viewing
            embed: "private", // Private embedding
            download: false, // Disable downloads
          },
          embed: {
            buttons: {
              like: false,
              watchlater: false,
              share: false,
              embed: false,
              hd: true,
              fullscreen: true,
              scaling: true,
            },
            logos: {
              vimeo: false,
            },
            title: {
              name: "hide",
              owner: "hide",
              portrait: "hide",
            },
          },
          ...options,
        },
        (uri, status, body) => {
          if (status === 200) {
            resolve({
              success: true,
              videoId: body.uri.split("/").pop(),
              uri: body.uri,
              link: body.link,
              embed: body.embed,
              player_embed_url: body.player_embed_url,
              duration: body.duration,
              width: body.width,
              height: body.height,
              size: body.size,
              created_time: body.created_time,
              modified_time: body.modified_time,
            });
          } else {
            reject(new Error(`Vimeo upload failed: ${body.error || "Unknown error"}`));
          }
        },
        (bytesUploaded, bytesTotal) => {
          const percentage = (bytesUploaded / bytesTotal * 100).toFixed(2);
          console.log(`Upload progress: ${percentage}%`);
        }
      );
    });
  }

  // Get video information
  async getVideo(videoId) {
    return new Promise((resolve, reject) => {
      this.client.request(
        {
          method: "GET",
          path: `/videos/${videoId}`,
        },
        (error, body, statusCode) => {
          if (error) {
            reject(error);
          } else {
            resolve({
              success: true,
              video: body,
            });
          }
        }
      );
    });
  }

  // Update video settings
  async updateVideo(videoId, updates) {
    return new Promise((resolve, reject) => {
      this.client.request(
        {
          method: "PATCH",
          path: `/videos/${videoId}`,
          query: updates,
        },
        (error, body, statusCode) => {
          if (error) {
            reject(error);
          } else {
            resolve({
              success: true,
              video: body,
            });
          }
        }
      );
    });
  }

  // Delete video from Vimeo
  async deleteVideo(videoId) {
    return new Promise((resolve, reject) => {
      this.client.request(
        {
          method: "DELETE",
          path: `/videos/${videoId}`,
        },
        (error, body, statusCode) => {
          if (error) {
            reject(error);
          } else {
            resolve({
              success: true,
              message: "Video deleted successfully",
            });
          }
        }
      );
    });
  }

  // Get video embed code with DRM protection
  getEmbedCode(videoId, options = {}) {
    const {
      width = 640,
      height = 360,
      autoplay = false,
      loop = false,
      muted = false,
      controls = true,
    } = options;

    return {
      iframe: `<iframe src="https://player.vimeo.com/video/${videoId}?autoplay=${autoplay}&loop=${loop}&muted=${muted}&controls=${controls}" width="${width}" height="${height}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`,
      url: `https://player.vimeo.com/video/${videoId}`,
      thumbnail: `https://vumbnail.com/${videoId}.jpg`,
    };
  }

  // Get video thumbnail
  async getVideoThumbnail(videoId) {
    try {
      const video = await this.getVideo(videoId);
      return {
        success: true,
        thumbnail: video.video.pictures?.sizes?.[0]?.link || null,
        thumbnails: video.video.pictures?.sizes || [],
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Set video privacy settings for DRM protection
  async setVideoPrivacy(videoId, privacySettings = {}) {
    const defaultSettings = {
      view: "disable", // Disable public viewing
      embed: "private", // Private embedding
      download: false, // Disable downloads
      add: false, // Disable adding to collections
      comments: "nobody", // Disable comments
    };

    const settings = { ...defaultSettings, ...privacySettings };

    return this.updateVideo(videoId, {
      privacy: settings,
    });
  }

  // Get video analytics
  async getVideoAnalytics(videoId, period = "30d") {
    return new Promise((resolve, reject) => {
      this.client.request(
        {
          method: "GET",
          path: `/videos/${videoId}/stats`,
          query: { period },
        },
        (error, body, statusCode) => {
          if (error) {
            reject(error);
          } else {
            resolve({
              success: true,
              analytics: body,
            });
          }
        }
      );
    });
  }

  // Generate signed embed URL for secure video access
  generateSignedEmbedUrl(videoId, userId, expiresIn = 3600) {
    // This would typically involve generating a JWT token with user info
    // and video access permissions, then appending it to the embed URL
    const token = this.generateAccessToken(userId, videoId, expiresIn);
    return `https://player.vimeo.com/video/${videoId}?token=${token}`;
  }

  // Generate access token for video access
  generateAccessToken(userId, videoId, expiresIn) {
    // In a real implementation, this would use JWT or similar
    // to create a signed token that includes user permissions
    const payload = {
      userId,
      videoId,
      exp: Math.floor(Date.now() / 1000) + expiresIn,
      permissions: ["view"],
    };
    
    // This is a simplified example - use proper JWT signing in production
    return Buffer.from(JSON.stringify(payload)).toString("base64");
  }

  // Verify access token
  verifyAccessToken(token) {
    try {
      const payload = JSON.parse(Buffer.from(token, "base64").toString());
      const now = Math.floor(Date.now() / 1000);
      
      if (payload.exp < now) {
        return { valid: false, error: "Token expired" };
      }
      
      return { valid: true, payload };
    } catch (error) {
      return { valid: false, error: "Invalid token" };
    }
  }
}

export default new VimeoService();