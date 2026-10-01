import nodemailer from 'nodemailer';

/**
 * Send registration details to Admin email
 * @param {Object} student
 * @returns {Promise<boolean>} returns true if sent successfully, false otherwise
 */
export const sendAdminRegistrationEmail = async (student) => {
  try {

    // ================================
    // DEBUG: Check SMTP configuration
    // ================================
    console.log("========== SMTP CONFIG ==========");
    console.log("SMTP HOST:", process.env.SMTP_HOST);
    console.log("SMTP PORT:", process.env.SMTP_PORT);
    console.log("SMTP USER:", process.env.SMTP_USER);
    console.log("=================================");

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT) || 587;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASSWORD || process.env.SMTP_PASS;
    const from = process.env.SMTP_FROM || `"Student Portal" <${user}>`;
    const adminEmail = process.env.ADMIN_EMAIL;

    // Check if SMTP details are provided
    if (!host || !user) {
      console.warn(
        'SMTP configuration missing in .env. Email notification skipped.'
      );
      return false;
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass
      },

      // Timeout to avoid hanging requests if SMTP server is unreachable
      connectionTimeout: 5000,
      greetingTimeout: 5000,
      socketTimeout: 5000
    });

    const regDate = student.createdAt
      ? new Date(student.createdAt).toLocaleString()
      : new Date().toLocaleString();

    const mailOptions = {
      from,
      to: adminEmail,

      subject: `New Student Registration - ${student.studentName}`,

      text: `New student registration received.

Student Name: ${student.studentName}
Father Name: ${student.fatherName}
Mother Name: ${student.motherName}
Roll Number: ${student.rollNo}
Phone Number: ${student.phoneNo}
Email: ${student.email}
10th Marks: ${student.marks10}%
12th Marks: ${student.marks12}%
Registration Date: ${regDate}`,

      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f8fafc; border-radius: 8px;">

          <h2 style="color: #4f46e5; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">
            New Student Registration Received
          </h2>

          <table style="width: 100%; text-align: left; border-collapse: collapse;">

            <tr>
              <th style="padding: 8px; border-bottom: 1px solid #e2e8f0;">
                Student Name:
              </th>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">
                ${student.studentName}
              </td>
            </tr>

            <tr>
              <th style="padding: 8px; border-bottom: 1px solid #e2e8f0;">
                Father Name:
              </th>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">
                ${student.fatherName}
              </td>
            </tr>

            <tr>
              <th style="padding: 8px; border-bottom: 1px solid #e2e8f0;">
                Mother Name:
              </th>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">
                ${student.motherName}
              </td>
            </tr>

            <tr>
              <th style="padding: 8px; border-bottom: 1px solid #e2e8f0;">
                Roll Number:
              </th>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">
                ${student.rollNo}
              </td>
            </tr>

            <tr>
              <th style="padding: 8px; border-bottom: 1px solid #e2e8f0;">
                Phone Number:
              </th>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">
                ${student.phoneNo}
              </td>
            </tr>

            <tr>
              <th style="padding: 8px; border-bottom: 1px solid #e2e8f0;">
                Email:
              </th>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">
                ${student.email}
              </td>
            </tr>

            <tr>
              <th style="padding: 8px; border-bottom: 1px solid #e2e8f0;">
                10th Marks:
              </th>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">
                ${student.marks10}%
              </td>
            </tr>

            <tr>
              <th style="padding: 8px; border-bottom: 1px solid #e2e8f0;">
                12th Marks:
              </th>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">
                ${student.marks12}%
              </td>
            </tr>

            <tr>
              <th style="padding: 8px; border-bottom: 1px solid #e2e8f0;">
                Registration Date:
              </th>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">
                ${regDate}
              </td>
            </tr>

          </table>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);

    console.log(
      `[Email Service] Registration notification email sent to ${adminEmail}. MessageID: ${info.messageId}`
    );

    return true;

  } catch (error) {

    // Log server-side error safely without exposing passwords
    console.error(
      '[Email Service Error] Failed to send admin email:',
      error.message
    );

    // Return false safely - DB saving remains successful
    return false;
  }
};