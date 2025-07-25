// Email automation system for Systoro
// Integrates with SendGrid, Mailgun, or similar services

interface EmailTemplate {
  subject: string;
  html: string;
  variables?: Record<string, string>;
}

interface AutomationTrigger {
  event: string;
  delay?: number; // in milliseconds
  condition?: (data: any) => boolean;
}

export class EmailAutomationEngine {
  private templates: Map<string, EmailTemplate> = new Map();
  private triggers: Map<string, AutomationTrigger[]> = new Map();

  constructor() {
    this.initializeTemplates();
    this.initializeTriggers();
  }

  private initializeTemplates() {
    // Welcome email for new subscribers
    this.templates.set('welcome-starter', {
      subject: 'Welcome to Systoro - Your Process Tools Are Ready!',
      html: `
        <h2>Welcome to Systoro!</h2>
        <p>Your <strong>Starter Audit</strong> package is now active. You have instant access to:</p>
        <ul>
          <li>✅ Process Mapping Snapshot - Map your suppliers, inputs, outputs, and customers</li>
          <li>✅ Root Cause Drill Down - 5 Whys analysis for problem solving</li>
          <li>✅ Issue Prioritizer - Pareto analysis to focus on vital few issues</li>
        </ul>
        <p><a href="{{toolsUrl}}" style="background-color: #1D3557; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Launch Your Tools →</a></p>
        <p>Need help getting started? <a href="{{bookingUrl}}">Book a quick onboarding call</a> - it's included with your package!</p>
      `,
      variables: { toolsUrl: '', bookingUrl: '' }
    });

    this.templates.set('welcome-professional', {
      subject: 'Systoro Professional - All Tools Unlocked!',
      html: `
        <h2>Welcome to Systoro Professional!</h2>
        <p>Your <strong>Optimization Package</strong> is now active with all advanced tools:</p>
        <ul>
          <li>✅ All Starter tools (Process Mapping, Root Cause, Issue Prioritizer)</li>
          <li>🚀 Risk Matrix Builder - FMEA with automated RPN calculation</li>
          <li>🚀 Root Cause Explorer - Fishbone diagrams for systematic analysis</li>
          <li>🚀 Flow Analyzer - Value stream mapping with waste identification</li>
        </ul>
        <p><a href="{{toolsUrl}}" style="background-color: #F4A261; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Access All Tools →</a></p>
        <p>Professional support is included - <a href="{{bookingUrl}}">schedule your first strategy session</a>!</p>
      `,
      variables: { toolsUrl: '', bookingUrl: '' }
    });

    this.templates.set('welcome-enterprise', {
      subject: 'Systoro Enterprise - Complete Process Transformation Suite',
      html: `
        <h2>Welcome to Systoro Enterprise!</h2>
        <p>Your <strong>Transformation Retainer</strong> is now active with our complete suite:</p>
        <ul>
          <li>✅ All Professional tools (6 interactive process improvement tools)</li>
          <li>⭐ Stability Tracker - Automated monthly control charts</li>
          <li>⭐ Advanced Analytics - Data science for process intelligence</li>
          <li>⭐ Priority Support - Dedicated success manager</li>
        </ul>
        <p><a href="{{toolsUrl}}" style="background-color: #1D3557; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Launch Complete Suite →</a></p>
        <p>Your dedicated success manager will contact you within 24 hours to schedule your transformation planning session.</p>
      `,
      variables: { toolsUrl: '', bookingUrl: '' }
    });

    // Tool completion emails
    this.templates.set('tool-completed', {
      subject: 'Your {{toolName}} Analysis is Complete',
      html: `
        <h2>{{toolName}} Analysis Complete!</h2>
        <p>Great work completing your process analysis. Here's what you've accomplished:</p>
        <div style="background-color: #f8f9fa; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <h3>Key Insights Generated:</h3>
          <p>{{insights}}</p>
        </div>
        <p><a href="{{reportUrl}}" style="background-color: #1D3557; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Download PDF Report →</a></p>
        <p>Ready for the next step? <a href="{{bookingUrl}}">Book a debrief session</a> to discuss implementation.</p>
      `,
      variables: { toolName: '', insights: '', reportUrl: '', bookingUrl: '' }
    });

    // Upsell sequences
    this.templates.set('upsell-starter-to-professional', {
      subject: 'Unlock Deeper Analysis with Professional Tools',
      html: `
        <h2>Ready for Deeper Process Analysis?</h2>
        <p>You've been using Systoro for 7 days - great progress! Based on your activity, you're ready for advanced tools:</p>
        <ul>
          <li>🔍 Risk Matrix Builder - Systematic failure analysis with FMEA</li>
          <li>🔍 Root Cause Explorer - Fishbone diagrams for team brainstorming</li>
          <li>🔍 Flow Analyzer - End-to-end process mapping with waste identification</li>
        </ul>
        <p><a href="{{upgradeUrl}}" style="background-color: #F4A261; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Upgrade to Professional →</a></p>
        <p><em>Upgrade today and get 50% off your first month!</em></p>
      `,
      variables: { upgradeUrl: '' }
    });

    this.templates.set('upsell-professional-to-enterprise', {
      subject: 'Keep Your Gains on Autopilot - Monthly Monitoring',
      html: `
        <h2>Sustain Your Process Improvements</h2>
        <p>You've made excellent progress with Professional tools. Now ensure lasting results with automated monitoring:</p>
        <ul>
          <li>📊 Automated monthly control charts from your data</li>
          <li>📊 Stability tracking with early warning alerts</li>
          <li>📊 Dedicated success manager for ongoing optimization</li>
        </ul>
        <p><a href="{{upgradeUrl}}" style="background-color: #1D3557; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Upgrade to Enterprise →</a></p>
        <p>Transform one-time improvements into sustainable competitive advantage.</p>
      `,
      variables: { upgradeUrl: '' }
    });
  }

  private initializeTriggers() {
    // Immediate triggers
    this.triggers.set('subscription.created', [
      { event: 'send-welcome-email', delay: 0 }
    ]);

    this.triggers.set('tool.completed', [
      { event: 'send-completion-email', delay: 5000 }, // 5 second delay
      { event: 'show-booking-widget', delay: 10000 }   // 10 second delay
    ]);

    // Delayed triggers for upselling
    this.triggers.set('subscription.created.starter', [
      { event: 'upsell-to-professional', delay: 7 * 24 * 60 * 60 * 1000 } // 7 days
    ]);

    this.triggers.set('subscription.created.professional', [
      { event: 'upsell-to-enterprise', delay: 30 * 24 * 60 * 60 * 1000 } // 30 days
    ]);

    // Monthly automation for enterprise
    this.triggers.set('enterprise.monthly', [
      { event: 'generate-control-chart', delay: 0 },
      { event: 'send-monthly-report', delay: 60000 } // 1 minute after chart generation
    ]);
  }

  async triggerAutomation(event: string, data: any) {
    const triggers = this.triggers.get(event);
    if (!triggers) return;

    for (const trigger of triggers) {
      if (trigger.condition && !trigger.condition(data)) continue;

      setTimeout(() => {
        this.executeAutomation(trigger.event, data);
      }, trigger.delay || 0);
    }
  }

  private async executeAutomation(action: string, data: any) {
    switch (action) {
      case 'send-welcome-email':
        await this.sendWelcomeEmail(data);
        break;
      case 'send-completion-email':
        await this.sendToolCompletionEmail(data);
        break;
      case 'upsell-to-professional':
        await this.sendUpsellEmail('starter-to-professional', data);
        break;
      case 'upsell-to-enterprise':
        await this.sendUpsellEmail('professional-to-enterprise', data);
        break;
      case 'generate-control-chart':
        await this.generateControlChart(data);
        break;
      case 'send-monthly-report':
        await this.sendMonthlyReport(data);
        break;
      case 'show-booking-widget':
        await this.triggerBookingWidget(data);
        break;
    }
  }

  private async sendWelcomeEmail(data: { email: string; plan: string; userId: string }) {
    const templateKey = `welcome-${data.plan}`;
    const template = this.templates.get(templateKey);
    if (!template) return;

    const variables = {
      toolsUrl: `${process.env.BASE_URL}/tools`,
      bookingUrl: `${process.env.BASE_URL}/booking`
    };

    await this.sendEmail(data.email, template, variables);
    console.log(`Welcome email sent to ${data.email} for ${data.plan} plan`);
  }

  private async sendToolCompletionEmail(data: { email: string; toolName: string; insights: string; userId: string }) {
    const template = this.templates.get('tool-completed');
    if (!template) return;

    const variables = {
      toolName: data.toolName,
      insights: data.insights,
      reportUrl: `${process.env.BASE_URL}/tools/reports/${data.userId}`,
      bookingUrl: `${process.env.BASE_URL}/booking`
    };

    await this.sendEmail(data.email, template, variables);
    console.log(`Tool completion email sent for ${data.toolName} to ${data.email}`);
  }

  private async sendUpsellEmail(type: string, data: { email: string; userId: string }) {
    const templateKey = `upsell-${type}`;
    const template = this.templates.get(templateKey);
    if (!template) return;

    const variables = {
      upgradeUrl: `${process.env.BASE_URL}/subscribe?upgrade=true&user=${data.userId}`
    };

    await this.sendEmail(data.email, template, variables);
    console.log(`Upsell email (${type}) sent to ${data.email}`);
  }

  private async generateControlChart(data: { userId: string; email: string }) {
    // This would integrate with your data analysis system
    console.log(`Generating control chart for user ${data.userId}`);
    // Implementation would pull user's data and generate charts
  }

  private async sendMonthlyReport(data: { userId: string; email: string }) {
    console.log(`Sending monthly report to ${data.email}`);
    // Implementation would send automated monthly insights
  }

  private async triggerBookingWidget(data: { userId: string }) {
    // This would trigger a frontend notification or popup
    console.log(`Triggering booking widget for user ${data.userId}`);
  }

  private async sendEmail(email: string, template: EmailTemplate, variables: Record<string, string>) {
    // In production, integrate with SendGrid, Mailgun, or similar
    // For now, we'll log the email content
    
    let html = template.html;
    for (const [key, value] of Object.entries(variables)) {
      html = html.replace(new RegExp(`{{${key}}}`, 'g'), value);
    }

    console.log(`
EMAIL TO: ${email}
SUBJECT: ${template.subject}
CONTENT: ${html}
---
    `);

    // Production implementation would be:
    // await sendGridClient.send({
    //   to: email,
    //   from: 'noreply@thesolutiondesk.ca',
    //   subject: template.subject,
    //   html: html
    // });
  }
}

// Singleton instance
export const emailAutomation = new EmailAutomationEngine();