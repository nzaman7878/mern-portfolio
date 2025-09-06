const nodemailer = require('nodemailer');
const config = require('../config');
const logger = require('./logger');

class EmailService {
  constructor() {
    this.transporter = null;
    this.initialize();
  }

  initialize() {
    if (!config.EMAIL_ENABLED) {
      logger.info('Email service disabled');
      return;
    }

    try {
      this.transporter = nodemailer.createTransporter({
        host: config.SMTP_HOST,
        port: config.SMTP_PORT,
        secure: config.SMTP_SECURE,
        auth: {
          user: config.SMTP_USER,
          pass: config.SMTP_PASS
        }
      });

      // Verify connection
      this.transporter.verify((error, success) => {
        if (error) {
          logger.error('Email service connection failed:', error);
        } else {
          logger.info('Email service ready');
        }
      });
    } catch (error) {
      logger.error('Failed to initialize email service:', error);
    }
  }

  async sendContactNotification(contactMessage) {
    if (!this.transporter) {
      logger.warn('Email service not available, skipping notification');
      return;
    }

    try {
      const { name, email, subject, message, phone, company } = contactMessage;

      const mailOptions = {
        from: config.EMAIL_FROM,
        to: config.EMAIL_TO,
        subject: `New Contact Message: ${subject}`,
        html: this.generateContactEmailTemplate({
          name,
          email,
          subject,
          message,
          phone,
          company,
          receivedAt: new Date().toLocaleString()
        })
      };

      const result = await this.transporter.sendMail(mailOptions);
      logger.info(`Contact notification sent: ${result.messageId}`);
      return result;
    } catch (error) {
      logger.error('Failed to send contact notification:', error);
      throw error;
    }
  }

  async sendAutoReply(contactMessage) {
    if (!this.transporter || !config.AUTO_REPLY_ENABLED) {
      return;
    }

    try {
      const { name, email, subject } = contactMessage;

      const mailOptions = {
        from: config.EMAIL_FROM,
        to: email,
        subject: `Re: ${subject}`,
        html: this.generateAutoReplyTemplate({ name })
      };

      const result = await this.transporter.sendMail(mailOptions);
      logger.info(`Auto-reply sent to: ${email}`);
      return result;
    } catch (error) {
      logger.error('Failed to send auto-reply:', error);
      // Don't throw error for auto-reply failures
    }
  }

  generateContactEmailTemplate({ name, email, subject, message, phone, company, receivedAt }) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Contact Message</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
          .content { background: white; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #495057; }
          .value { margin-top: 5px; }
          .message-content { background: #f8f9fa; padding: 15px; border-radius: 4px; white-space: pre-wrap; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Contact Message Received</h2>
            <p>Received at: ${receivedAt}</p>
          </div>
          
          <div class="content">
            <div class="field">
              <div class="label">Name:</div>
              <div class="value">${name}</div>
            </div>
            
            <div class="field">
              <div class="label">Email:</div>
              <div class="value"><a href="mailto:${email}">${email}</a></div>
            </div>
            
            <div class="field">
              <div class="label">Subject:</div>
              <div class="value">${subject}</div>
            </div>
            
            ${phone ? `
            <div class="field">
              <div class="label">Phone:</div>
              <div class="value">${phone}</div>
            </div>
            ` : ''}
            
            ${company ? `
            <div class="field">
              <div class="label">Company:</div>
              <div class="value">${company}</div>
            </div>
            ` : ''}
            
            <div class="field">
              <div class="label">Message:</div>
              <div class="value">
                <div class="message-content">${message}</div>
              </div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  generateAutoReplyTemplate({ name }) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Thank you for your message</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .content { background: white; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Thank you for getting in touch!</h2>
          </div>
          
          <div class="content">
            <p>Hi ${name},</p>
            
            <p>Thank you for your message! I've received your inquiry and will get back to you within 24-48 hours.</p>
            
            <p>In the meantime, feel free to:</p>
            <ul>
              <li>Check out my <a href="${config.CLIENT_URL}/projects">latest projects</a></li>
              <li>Connect with me on <a href="https://linkedin.com/in/yourprofile">LinkedIn</a></li>
              <li>Follow my work on <a href="https://github.com/yourusername">GitHub</a></li>
            </ul>
            
            <p>I look forward to our conversation!</p>
            
            <p>Best regards,<br>Your Name</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}

module.exports = new EmailService();
