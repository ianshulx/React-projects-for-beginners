import os
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Image, Spacer, PageBreak, Table, TableStyle
)
from reportlab.graphics.shapes import Drawing, Rect
from datetime import datetime

from datetime import datetime

def parse_date(date_value):
    if isinstance(date_value, datetime):
        return date_value  # Already a datetime object, return as is
    elif isinstance(date_value, str):
        try:
            if date_value.endswith('Z'):
                date_value = date_value.replace('Z', '+00:00')  # Convert Z to UTC offset
            return datetime.fromisoformat(date_value)
        except ValueError:
            print(f"Invalid date format: {date_value}")
            return None  # Handle invalid date gracefully
    else:
        print(f"Unexpected date type: {type(date_value)}")
        return None


def create_pdf_notes(notes_data, logo_path):
    print("Creating PDF called")
    output_dir = 'C:\\Users\\raj\\Desktop\\Computer Languages\\IWP\\react\\inotebook\\flask-server\\output'
    os.makedirs(output_dir, exist_ok=True)

    output_path = os.path.join(output_dir, 'notes.pdf')
    pdf = SimpleDocTemplate(output_path, pagesize=letter)

    styles = getSampleStyleSheet()
    title_style = styles['Title']
    custom_style = ParagraphStyle(name='CustomStyle', fontSize=12, textColor=colors.black)

    content = []
    toc_entries = []  # Store entries for Table of Contents

    content.append(Image(logo_path, width=60, height=60))  # Logo
    content.append(Spacer(1, 12))  # Space between logo and title
    content.append(Paragraph("<b>iNoteBook</b>", title_style))  # Main Title

    line = Drawing(500, 1)
    line.add(Rect(0, 0, 500, 1, fillColor=colors.black))
    content.append(line)
    content.append(Spacer(1, 12))  # Space after the line

    content.append(Paragraph(f"<b>Email:</b> {notes_data[0]['email']}", custom_style))
    content.append(Spacer(1, 24))  # Space before Table of Contents

    content.append(Paragraph("<b>Table of Contents</b>", title_style))
    toc_data = [[f"{idx + 1}. {note['title']}", f"Page {idx + 2}"]  # Adjust page numbers
                for idx, note in enumerate(notes_data)]
    toc_table = Table(toc_data, colWidths=[400, 100])
    toc_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.lightgrey),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.black),
        ('ALIGN', (1, 0), (-1, -1), 'RIGHT'),
        ('INNERGRID', (0, 0), (-1, -1), 0.25, colors.black),
        ('BOX', (0, 0), (-1, -1), 0.25, colors.black),
    ]))
    content.append(toc_table)
    content.append(PageBreak())  

    for idx, note in enumerate(notes_data):
        content.append(Paragraph(f"<b>{idx + 1}. {note['title']}</b>", title_style))
        content.append(Spacer(1, 12))

        note_date = parse_date(note['date'])

        if note_date:
            content.append(Paragraph(f"<b>Created Date:</b> {note_date.strftime('%Y-%m-%d')}", custom_style))
        else:
            content.append(Paragraph(f"<b>Created Date:</b> Invalid Date", custom_style))

        content.append(Spacer(1, 12))

        line = Drawing(500, 1)
        line.add(Rect(0, 0, 500, 1, fillColor=colors.black))
        content.append(line)
        content.append(Spacer(1, 12))

        content.append(Paragraph(f"<b>Tag:</b> {note['tag']}", custom_style))
        content.append(Spacer(1, 12))
        content.append(Paragraph(f"<b>Description:</b> {note['description']}", custom_style))
        content.append(Spacer(1, 24))

        if idx < len(notes_data) - 1:
            content.append(PageBreak())

    pdf.build(content)
    return output_path

notes_data = [{'title': 'Note To Download', 'description': 'This note is going to downloade.', 'tag': 'Download the Note', 'date': '2024-10-21T18:06:45.120Z', 'email': 'testapi123@gmail.com'}, {'title': 'My Second Note', 'description': 'Yes It the Second Note', 'tag': 'Yessssss', 'date': '2024-10-21T18:06:45.120Z', 'email': 'testapi123@gmail.com'}, {'title': 'Lengthy Description', 'description': 'Graph theory is a fundamental area of discrete mathematics and data structures that studies graphs, which are mathematical representations of networks consisting of vertices (or nodes) and edges (connections between the nodes). In data structures and algorithms (DSA), graphs play a crucial role in modeling relationships and interactions, such as social networks, transportation systems, and web page links. Key concepts in graph theory include traversals (like depth-first search and breadth-first search), shortest path algorithms (like Dijkstra’s and Bellman-Ford), and minimum spanning tree algorithms (like Prim’s and Kruskal’s). These concepts enable efficient problem-solving for a variety of applications, such as route optimization, network design, and connectivity analysis. Understanding graph theory is essential for developing efficient algorithms and data structures that can handle complex relational data.', 'tag': 'Graph Theory', 'date': '2024-10-21T18:06:45.120Z', 'email': 'testapi123@gmail.com'}, {'title': 'My Added Notes', 'description': 'Hey I Am Raj Mistry', 'tag': 'Raj Mistry', 'date': '2024-10-21T18:06:45.120Z', 'email': 'testapi123@gmail.com'}] 

logo_path = "C:\\Users\\raj\\Desktop\\Computer Languages\\IWP\\react\\inotebook\\public\\assets\\logo2.png"

if __name__ == "__main__":
    pdf_path = create_pdf_notes(notes_data, logo_path)
    print(f"PDF created at: {pdf_path}")
