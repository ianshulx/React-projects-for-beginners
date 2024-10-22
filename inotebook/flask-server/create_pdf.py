import os
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Image, Spacer
from reportlab.graphics.shapes import Drawing, Rect  
from datetime import datetime

def create_pdf(note_data, logo_path):
    output_dir = 'C:\\Users\\raj\\Desktop\\Computer Languages\\IWP\\react\\inotebook\\flask-server\\output'
    os.makedirs(output_dir, exist_ok=True)

    output_path = os.path.join(output_dir, 'note.pdf')
    pdf = SimpleDocTemplate(output_path, pagesize=letter)

    styles = getSampleStyleSheet()
    title_style = styles['Title']
    custom_style = ParagraphStyle(name='CustomStyle', fontSize=12, textColor=colors.black)

    content = []

    # Header content
    header_table_data = [
        [
            Image(logo_path, width=60, height=60),  # Logo
            Paragraph("<b>iNoteBook</b>", title_style),  # Title
            Paragraph(f"<b>Created Date:</b> {note_data['date'].strftime('%Y-%m-%d')}", custom_style),  # Created Date
            Paragraph(f"<b>Email:</b> {note_data['email']}", custom_style)  # Email
        ]
    ]

    for row in header_table_data:
        content.append(Spacer(1, 12))  
        content.append(row[0])  
        content.append(Spacer(1, 12))  # Space 
        content.append(row[1])  # Add title
        content.append(Spacer(1, 12))  # Space after title

        # Add dates on the left side
        content.append(Paragraph(f"<b>Created Date:</b> {note_data['date'].strftime('%Y-%m-%d')}", custom_style))
        
        # Add email on the right side
        content.append(Spacer(1, 12))  # Space before email
        content.append(Paragraph(f"<b>Email:</b> {note_data['email']}", custom_style))
        content.append(Spacer(1, 12))  # Space after email

    line = Drawing(500, 1)  # Set the width and height of the line
    line.add(Rect(0, 0, 500, 1, fillColor=colors.black))  # Create a black rectangle
    content.append(line)
    content.append(Spacer(1, 12))  # Space after the line

    description = Paragraph("This is a note from your iNoteBook application.", custom_style)
    content.append(description)
    content.append(Spacer(1, 12))  # Space after description

    title = note_data.get('title', 'No Title')
    description_text = note_data.get('description', 'No Description')
    tag = note_data.get('tag', 'No Tag')
    
    note_title = Paragraph(f"<b>Title:</b> {title}", custom_style)
    content.append(note_title)
    content.append(Spacer(1, 12))  # Add space after title

    note_tag = Paragraph(f"<b>Tag:</b> {tag}", custom_style)
    content.append(note_tag)
    content.append(Spacer(1, 12))  

    note_description = Paragraph(f"<b>Description:</b> {description_text}", custom_style)
    content.append(note_description)
    content.append(Spacer(1, 12))  

    pdf.build(content)

    return output_path  

note_data = {
    'title': 'New Note Today',
    'description': 'hvgjfhbjgvfryvjhgbhj',
    'tag': 'kjlgu',
    'date': datetime(2024, 10, 17, 16, 16, 12, 551000),
    'email': 'user@example.com',  
}

logo_path = "C:\\Users\\raj\\Desktop\\Computer Languages\\IWP\\react\\inotebook\\public\\assets\\logo2.png"  # Replace with your logo path

if __name__ == "__main__": 
    pdf_path = create_pdf(note_data, logo_path)  
    print(f"PDF created at: {pdf_path}")  
