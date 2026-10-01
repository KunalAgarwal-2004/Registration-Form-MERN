import { Resend } from 'resend';

/**
 * Send registration details to Admin email
 * @param {Object} student
 * @returns {Promise<boolean>}
 */
export const sendAdminRegistrationEmail = async (student) => {
  try {
    console.log("========== EMAIL CONFIG ==========");
    console.log(
      "RESEND API KEY:",
      process.env.RESEND_API_KEY ? "Loaded ✅" : "Missing ❌"
    );
    console.log("ADMIN EMAIL:", process.env.ADMIN_EMAIL);
    console.log("==================================");

    const apiKey = process.env.RESEND_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!apiKey || !adminEmail) {
      console.warn(
        "Resend configuration missing. Email notification skipped."
      );
      return false;
    }

    const resend = new Resend(apiKey);

    const regDate = student.createdAt
      ? new Date(student.createdAt).toLocaleString()
      : new Date().toLocaleString();

    const { data, error } = await resend.emails.send({
      from: "Student Portal <onboarding@resend.dev>",

      to: [adminEmail],

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
        <div style="
          font-family: Arial, sans-serif;
          padding: 20px;
          background-color: #f8fafc;
          border-radius: 8px;
        ">

          <h2 style="
            color: #4f46e5;
            border-bottom: 2px solid #e2e8f0;
            padding-bottom: 10px;
          ">
            New Student Registration Received
          </h2>

          <table style="
            width: 100%;
            text-align: left;
            border-collapse: collapse;
          ">

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
    });

    if (error) {
      console.error(
        "[Email Service Error] Resend failed:",
        error.message
      );

      return false;
    }

    console.log(
      `[Email Service] Registration email sent successfully. Message ID: ${data.id}`
    );

    return true;

  } catch (error) {
    console.error(
      "[Email Service Error] Failed to send admin email:",
      error.message
    );

    return false;
  }
};