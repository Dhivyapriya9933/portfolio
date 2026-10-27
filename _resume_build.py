from fpdf import FPDF

OUT = r"D:\Projects\New folder\portfoliome\portfolio\M-Dhivya-Resume.pdf"
FONT = r"C:\Windows\Fonts\segoeui.ttf"
FONT_B = r"C:\Windows\Fonts\segoeuib.ttf"

INK = (8, 18, 26)
TEAL = (14, 122, 112)
MUTED = (78, 98, 108)
BODY = (36, 52, 62)


pdf = FPDF(format="A4", unit="mm")
pdf.set_auto_page_break(auto=False)
pdf.add_font("Segoe", "", FONT)
pdf.add_font("Segoe", "B", FONT_B)
pdf.add_page()
pdf.set_fill_color(*TEAL)
pdf.rect(0, 0, 5.5, 297, "F")

pdf.set_xy(16, 14)
pdf.set_font("Segoe", "B", 22)
pdf.set_text_color(*INK)
pdf.cell(0, 9, "M Dhivya", new_x="LMARGIN", new_y="NEXT")

pdf.set_x(16)
pdf.set_font("Segoe", "", 11)
pdf.set_text_color(*TEAL)
pdf.cell(0, 6, "Full Stack Developer  ·  4+ years  ·  Open to full-time and freelance", new_x="LMARGIN", new_y="NEXT")

pdf.ln(1)
pdf.set_x(16)
pdf.set_font("Segoe", "", 9.5)
pdf.set_text_color(*MUTED)
pdf.cell(0, 5, "Ramapuram, Chennai   ·   dhivyapriya0303@gmail.com   ·   +91 88835 71421", new_x="LMARGIN", new_y="NEXT")
pdf.cell(0, 5, "Tamil and English   ·   B.E. Computer Science, 2019", new_x="LMARGIN", new_y="NEXT")

pdf.ln(2)
pdf.set_draw_color(*TEAL)
pdf.set_line_width(0.4)
pdf.line(16, pdf.get_y(), 196, pdf.get_y())
pdf.ln(4)


def section(title):
    pdf.set_x(16)
    pdf.set_font("Segoe", "B", 10.5)
    pdf.set_text_color(*TEAL)
    pdf.cell(0, 6, title.upper(), new_x="LMARGIN", new_y="NEXT")
    y = pdf.get_y()
    pdf.set_draw_color(210, 226, 224)
    pdf.set_line_width(0.25)
    pdf.line(16, y, 196, y)
    pdf.ln(2.5)


def body(text):
    pdf.set_x(16)
    pdf.set_font("Segoe", "", 10)
    pdf.set_text_color(*BODY)
    pdf.multi_cell(180, 5, text)
    pdf.ln(1)


def role(title, where, dates, bullets):
    y = pdf.get_y()
    pdf.set_xy(16, y)
    pdf.set_font("Segoe", "B", 11)
    pdf.set_text_color(*INK)
    pdf.cell(120, 5.2, title)
    pdf.set_xy(136, y)
    pdf.set_font("Segoe", "", 9.5)
    pdf.set_text_color(*MUTED)
    pdf.cell(60, 5.2, dates, align="R")
    pdf.set_xy(16, y + 5.4)
    pdf.set_font("Segoe", "", 10)
    pdf.set_text_color(*TEAL)
    pdf.cell(0, 4.8, where, new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Segoe", "", 10)
    pdf.set_text_color(*BODY)
    for item in bullets:
        pdf.set_x(18)
        pdf.multi_cell(178, 4.6, "-  " + item)
    pdf.ln(1.2)


section("Summary")
body(
    "Full stack developer in Chennai. I take a product from the screen to the API. "
    "Day-to-day stack is React, React Native, Node.js, and MongoDB. "
    "I am a Full Stack Developer at bilimbe, building a CRM and event products."
)

section("Experience")
role(
    "Full Stack Developer",
    "bilimbe",
    "Jan 2025 - Present",
    [
        "Building a CRM. This is in progress.",
        "Ship event products from the screen to the API: live displays, registration, and admin tools.",
    ],
)
role(
    "Freelance Developer",
    "Food delivery systems",
    "Jan 2025 - Mar 2025",
    ["A three-month contract on food delivery software, alongside the bilimbe role."],
)
role(
    "Software Engineer",
    "Us Global Solutions",
    "May 2022 - Jan 2025",
    ["Built and maintained software for client projects for just under three years."],
)

section("Education")
role("B.E. Computer Science", "University College of Engineering", "2019", [])
role("Higher Secondary", "St. Theresa's Girls HSS", "2015", [])
role("SSLC", "Government High School", "2013", [])

section("Skills")
body("React, React Native, Node.js, MongoDB, JavaScript, REST APIs. Also Angular and Python.")

section("Selected work")
body(
    "Idhayam Quotient - four tablets for MGM Healthcare at Express Avenue: register, vitals, lifestyle questions, and a heart score.\n"
    "CRM - in progress at bilimbe, next to the event products.\n"
    "Mosaic Wall, SlingShot, event registration with QR entry, product admin, WhatsApp campaigns, trip check-in, MedNexus Summit registration, and Billing Agent."
)

pdf.output(OUT)
print("pages", pdf.page, "y", round(pdf.get_y(), 1))
