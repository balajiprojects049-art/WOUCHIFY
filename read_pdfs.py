import PyPDF2

def extract_text(filename):
    text = ""
    try:
        with open(filename, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            for page in reader.pages:
                text += page.extract_text() + "\n"
    except Exception as e:
        text = str(e)
    return text

doc1 = extract_text("Wouchify_Developement_Document.pdf")
doc2 = extract_text("wouchify_website_content...pdf")

with open("pdfs-content.txt", "w", encoding="utf-8") as f:
    f.write("=== Wouchify_Developement_Document.pdf ===\n")
    f.write(doc1)
    f.write("\n\n=== wouchify_website_content...pdf ===\n")
    f.write(doc2)
