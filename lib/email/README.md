# 📧 Email System Documentation for GBDC Website

## 🌟 What is This?

This is our **magical email system** that helps Great Beginnings Day Care send beautiful, professional emails to families! Think of it like having a super-smart assistant that knows exactly how to write and send different types of emails automatically.

### 🎯 For Kids (and Kids at Heart!)

Imagine if every time someone needed to send an email about our daycare, a friendly robot helper would:
- Pick the perfect template (like choosing the right stationery)
- Fill in all the important details (like names, dates, and information)
- Make it look super pretty with colors and pictures
- Send it to the right people at the right time
- Make sure it arrives safely

That's exactly what our email system does! 🤖✨

### 🎓 For Developers

This email system provides:
- **TypeScript-first approach** with comprehensive type definitions
- **React Email templates** using modern components and responsive design
- **Resend integration** with error handling and logging
- **Service layer abstraction** for clean API usage
- **Testing utilities** for development and debugging
- **Analytics tracking** for monitoring email performance

---

## 📁 File Structure

```
lib/email/
├── index.ts                    # Main configuration and types
├── services.ts                 # Email sending functions
├── templates/
│   ├── document-upload.tsx     # Document upload notifications
│   ├── contact-form.tsx        # Contact form emails
│   ├── welcome.tsx             # Welcome emails for new families
│   └── enrollment-confirmation.tsx # Enrollment confirmations
└── README.md                   # This documentation file
```

---

## 🚀 Quick Start

### 1. Environment Setup

Make sure your `.env.local` file has these values:

```env
# Required for sending emails
RESEND_API_KEY=re_your_actual_api_key_here
RESEND_FROM_EMAIL=noreply@yourdomain.com

# Business information (used in email templates)
NEXT_PUBLIC_BUSINESS_NAME=Great Beginnings Day Care Center
NEXT_PUBLIC_BUSINESS_PHONE=(630) 894-3440
NEXT_PUBLIC_BUSINESS_EMAIL=info@greatbeginningsdaycare.com
NEXT_PUBLIC_BUSINESS_ADDRESS=757 E Nerge Rd, Roselle, IL 60172
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

### 2. Basic Usage

```typescript
import { sendDocumentUploadEmail } from '@/lib/email/services'

// Send a document upload notification
const result = await sendDocumentUploadEmail(
  {
    parentName: 'Sarah Johnson',
    childName: 'Emma Johnson', 
    documentType: 'Immunization Records',
    fileName: 'emma-immunizations.pdf',
    uploadDate: new Date(),
    documentCount: 1
  },
  'sarah.johnson@email.com'
)

if (result.success) {
  console.log('Email sent successfully!')
} else {
  console.error('Email failed:', result.error)
}
```

---

## 📧 Available Email Types

### 1. 📄 Document Upload Notifications

**When to use:** When parents upload documents through the portal

```typescript
import { sendDocumentUploadEmail } from '@/lib/email/services'

await sendDocumentUploadEmail(
  {
    parentName: 'John Smith',
    childName: 'Sophie Smith',
    documentType: 'Health Forms',
    fileName: 'sophie-health-form.pdf',
    uploadDate: new Date(),
    documentCount: 2
  },
  'john.smith@email.com'
)
```

**What the email includes:**
- ✅ Confirmation that we received the document
- 📋 Details about what was uploaded
- ⏰ Processing timeline (1-2 business days)
- 🔗 Link to parent portal
- 📞 Contact information if they have questions

### 2. 📝 Contact Form Emails

**When to use:** When someone submits the website contact form

```typescript
import { sendContactFormEmails } from '@/lib/email/services'

// Sends TWO emails: one to staff, one confirmation to customer
await sendContactFormEmails(
  {
    name: 'Maria Garcia',
    email: 'maria.garcia@email.com',
    phone: '630-555-0123',
    message: 'I would like to schedule a tour for my 3-year-old.',
    inquiryType: 'Tour Request',
    submittedAt: new Date()
  },
  {
    sendToStaff: true,           // Send notification to staff
    sendConfirmation: true,      // Send confirmation to customer
    staffEmail: 'staff@daycare.com' // Optional: custom staff email
  }
)
```

**Staff email includes:**
- 🚨 Action required notice
- 👤 Complete contact information with clickable phone/email
- 💬 Full message from the family
- 🎯 Quick action buttons to reply

**Confirmation email includes:**
- ✨ Thank you message
- 📋 Summary of what they sent
- ⏰ Response time expectation (24 hours)
- 🏠 Invitation to visit in person

### 3. 🌟 Welcome Emails

**When to use:** When a new family is ready to start

```typescript
import { sendWelcomeEmail } from '@/lib/email/services'

await sendWelcomeEmail(
  {
    parentName: 'Jennifer Chen',
    childName: 'Lucas Chen',
    startDate: new Date('2024-09-15'),
    classroom: 'Busy Bees (2-3 years)',
    teacher: 'Ms. Maria'
  },
  'jennifer.chen@email.com'
)
```

**What the email includes:**
- 🎊 Huge welcome celebration message
- 📅 Important first-day details
- 🎒 First-day checklist (what to bring)
- 🌈 What to expect on day one
- 🌟 Special message "for the child"
- 📞 Contact information for questions

### 4. 🎉 Enrollment Confirmations

**When to use:** When enrollment is officially complete

```typescript
import { sendEnrollmentConfirmationEmail } from '@/lib/email/services'

await sendEnrollmentConfirmationEmail(
  {
    parentName: 'David Thompson',
    childName: 'Ava Thompson',
    program: 'Full-Time Preschool',
    startDate: new Date('2024-09-01'),
    classroom: 'Little Scholars (3-4 years)',
    teacher: 'Ms. Rebecca',
    tuition: 1250,
    nextSteps: [
      'Complete enrollment forms by Friday',
      'Schedule meet-and-greet with teacher',
      'Set up parent portal account',
      'Attend new parent orientation',
      'Bring supplies on first day'
    ]
  },
  'david.thompson@email.com'
)
```

**What the email includes:**
- 🎊 Official enrollment confirmation
- 📋 Complete program details
- 💳 Payment information and options
- 📝 Numbered next steps checklist
- 🌟 What makes the daycare special
- 📱 Links to parent resources

---

## 🔧 Advanced Usage

### Bulk Email Sending

```typescript
import { sendBulkEmails } from '@/lib/email/services'

const result = await sendBulkEmails([
  {
    type: 'welcome',
    data: welcomeData,
    recipient: 'parent1@email.com'
  },
  {
    type: 'enrollment',
    data: enrollmentData,
    recipient: 'parent2@email.com'
  }
])

console.log(`Sent ${result.successCount}/${result.totalSent} emails`)
```

### Email Previews (for Testing)

```typescript
import { 
  previewWelcomeEmail, 
  previewDocumentUploadEmail 
} from '@/lib/email/services'

// Get HTML preview without sending
const welcomeHtml = previewWelcomeEmail(welcomeData)
const documentHtml = previewDocumentUploadEmail(documentData)

// You can save these to files or display in browser for testing
```

### Testing with Sample Data

```typescript
import { sendTestEmails, TEST_EMAIL_DATA } from '@/lib/email/services'

// Send all email types to a test email address
await sendTestEmails('your-test-email@gmail.com')

// Or use the sample data for your own tests
console.log('Sample welcome data:', TEST_EMAIL_DATA.welcome)
```

### Email Analytics

```typescript
import { getEmailAnalytics, resetEmailAnalytics } from '@/lib/email/services'

// Check email statistics
const stats = getEmailAnalytics()
console.log(`Success rate: ${stats.successRate}%`)
console.log(`Total sent: ${stats.totalSent}`)

// Reset statistics (useful for testing)
resetEmailAnalytics()
```

---

## 🎨 Customizing Email Templates

### Changing Colors and Styles

All email templates use the `EMAIL_STYLES` configuration from `index.ts`:

```typescript
export const EMAIL_STYLES = {
  colors: {
    primary: '#3B82F6',      // Blue - trust and reliability
    secondary: '#10B981',    // Green - growth and nature  
    accent: '#F59E0B',       // Orange - warmth and energy
    text: '#374151',         // Dark gray - easy to read
    lightText: '#6B7280',    // Light gray - secondary text
    background: '#F9FAFB',   // Very light gray - email background
    white: '#FFFFFF'
  },
  // ... more styling options
}
```

### Adding New Email Types

1. **Create the template** in `templates/your-new-template.tsx`
2. **Add TypeScript types** to `index.ts`
3. **Create service function** in `services.ts`
4. **Add subject line** to `EMAIL_CONFIG.subjects`

### Example: Adding a "Birthday Email"

```typescript
// 1. Add to index.ts
export interface BirthdayEmailData {
  childName: string
  age: number
  birthdayDate: Date
  parentName: string
}

// 2. Add subject to EMAIL_CONFIG
subjects: {
  // ... existing subjects
  birthday: '🎂 Happy Birthday from Great Beginnings!'
}

// 3. Create template file templates/birthday.tsx
// 4. Add service function to services.ts
export async function sendBirthdayEmail(data: BirthdayEmailData, email: string) {
  // Implementation here
}
```

---

## 🐛 Troubleshooting

### Common Issues

**"RESEND_API_KEY is missing" Error**
- Check your `.env.local` file has the correct API key
- Make sure you're using the right environment file name
- Restart your development server after adding the key

**Emails not sending**
- Verify your Resend API key is valid and active
- Check that the "from" email domain is verified in Resend
- Look at the console logs for specific error messages

**TypeScript errors**
- Make sure all required fields in email data objects are provided
- Check that email addresses pass the `isValidEmail()` test
- Verify imported types match the actual data structure

**Emails look broken**
- Test with different email clients (Gmail, Outlook, Apple Mail)
- Check that all image URLs are accessible
- Verify CSS styles are inline (React Email handles this automatically)

### Debug Mode

```typescript
// Enable detailed logging
console.log('📧 Email data:', emailData)
console.log('📧 Recipient:', recipientEmail)

// Test email validation
import { isValidEmail } from '@/lib/email/index'
console.log('Email valid?', isValidEmail('test@example.com'))

// Preview email HTML
import { previewWelcomeEmail } from '@/lib/email/services'
const html = previewWelcomeEmail(data)
console.log('Generated HTML:', html)
```

### Testing in Development

```typescript
// Use test email addresses that won't send to real customers
const TEST_EMAIL = process.env.NODE_ENV === 'development' 
  ? 'your-test@gmail.com' 
  : actualCustomerEmail

await sendWelcomeEmail(welcomeData, TEST_EMAIL)
```

---

## 📊 Best Practices

### 🎯 For Developers

1. **Always validate email addresses** before sending
2. **Handle errors gracefully** - don't crash if email fails
3. **Use TypeScript types** - they prevent bugs and improve DX
4. **Test with real email clients** - not just browser previews
5. **Log email events** for debugging and analytics
6. **Keep sensitive data secure** - never log API keys

### 📧 For Content

1. **Keep subject lines clear and specific**
2. **Use emojis sparingly** - they enhance but shouldn't overwhelm
3. **Include clear call-to-action buttons**
4. **Provide contact information** in every email
5. **Test on mobile devices** - many people read email on phones
6. **Use child-friendly language** while remaining professional

### 🛡️ For Security

1. **Validate all input data** before processing
2. **Sanitize HTML content** if accepting user input
3. **Use environment variables** for sensitive configuration
4. **Rate limit email sending** to prevent abuse
5. **Monitor for suspicious activity** in email logs

---

## 🚀 Production Deployment

### Environment Variables

Make sure your production environment has:

```env
RESEND_API_KEY=re_live_api_key_here
RESEND_FROM_EMAIL=noreply@yourdomain.com
NEXT_PUBLIC_BUSINESS_NAME=Great Beginnings Day Care Center
# ... all other business variables
```

### Domain Configuration

1. **Verify your domain** in Resend dashboard
2. **Set up SPF/DKIM records** for better deliverability  
3. **Configure DMARC policy** for email security
4. **Test with your actual domain** before going live

### Monitoring

```typescript
// Add monitoring to your email functions
import { trackEmailSent } from '@/lib/email/services'

const result = await sendWelcomeEmail(data, email)
trackEmailSent(result.success, result.error)

// Check analytics periodically
const stats = getEmailAnalytics()
if (stats.successRate < 95) {
  // Alert administrators
  console.warn('Email success rate below 95%:', stats)
}
```

---

## 🤝 Contributing

### Adding New Features

1. **Follow the existing patterns** in the codebase
2. **Add comprehensive TypeScript types** for new data structures
3. **Include child-friendly comments** explaining what code does
4. **Test thoroughly** with real email addresses
5. **Update this documentation** with your changes

### Code Style

- **Use descriptive variable names** like `parentName` not `pn`
- **Include emoji in comments** to make code more friendly
- **Add error handling** for all external API calls
- **Write functions that do one thing well**

### Testing New Templates

```typescript
// Create test data
const testData = {
  parentName: 'Test Parent',
  childName: 'Test Child',
  // ... other required fields
}

// Generate preview
const html = previewYourNewEmail(testData)

// Save to file for browser testing
import fs from 'fs'
fs.writeFileSync('test-email.html', html)

// Test with real email
await sendYourNewEmail(testData, 'your-test@gmail.com')
```

---

## 📚 Resources

- **React Email Documentation:** https://react.email/docs
- **Resend API Documentation:** https://resend.com/docs
- **Email Design Best Practices:** https://www.campaignmonitor.com/blog/email-marketing/best-practices/
- **TypeScript Handbook:** https://www.typescriptlang.org/docs/

---

## ❤️ Final Notes

This email system was built with love for the Great Beginnings Day Care community! Every email sent through this system represents a connection between our daycare and the families we serve.

Remember: **Every email is an opportunity to show families how much we care about their children and their experience with us.** 

Let's make every email count! 🌟

---

*Last updated: December 2024*
*Created with 💙 for Great Beginnings Day Care Center*