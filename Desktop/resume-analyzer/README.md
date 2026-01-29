AI Resume Analyzer
==================

This is a Flask-based web application that lets you upload a PDF or DOC/DOCX resume, extracts the text, runs a lightweight NLP analysis and shows a detailed dashboard with scores and insights.

### How it works

1. **Upload** a resume on the home page (`/`).  
2. The server saves the file and extracts text using `PyPDF2`, `pdfplumber`, or `python-docx`.  
3. The text is analyzed by `utils/nlp_analyzer.py` to detect:
   - Technical skills
   - Soft skills
   - Education and experience
   - Work history, projects, achievements
   - Contact details (name, email, phone, links)
   - ATS compatibility score and overall resume score  
4. Results are returned as JSON and rendered safely in the browser (no raw HTML from user input).  
5. You can view all past uploads on the **Dashboard**, compare resumes, and export PDF reports.

### Tech stack / languages

- **Backend**: Python 3, Flask, Flask-Login, Flask‑SQLAlchemy, Flask‑Bcrypt, Flask‑Limiter  
- **Database**: SQLite (via SQLAlchemy ORM)  
- **Frontend**: HTML, CSS, JavaScript, Bootstrap, Font Awesome  
- **NLP / parsing**: `PyPDF2`, `pdfplumber`, `python-docx`, regex-based analysis in pure Python  
- **PDF reports**: `reportlab`


These will show the upload screen, the dashboard, and a typical analysis view once you add the image files.
*** End Patch```} ***!
#  AI Resume Analyzer

An intelligent resume analysis system powered by Flask, spaCy, and machine learning. Upload resumes in PDF or DOCX format and get instant AI-powered insights including skills extraction, experience estimation, education detection and overall scoring.

##  Features

- **Smart File Upload**: Drag-and-drop or click to upload PDF/DOCX resumes
- **NLP-Powered Analysis**: Uses spaCy for advanced natural language processing
- **Skills Detection**: Automatically identifies technical skills, frameworks, and technologies
- **Experience Estimation**: Calculates years of experience from resume content
- **Education Extraction**: Detects degrees, certifications, and educational background
- **Contact Information**: Extracts email addresses and phone numbers
- **Resume Scoring**: Provides an overall score (0-100) based on multiple factors
- **Dashboard**: View and manage all analyzed resumes
- **Modern UI**: Beautiful, responsive interface with gradient design


##  Getting Started

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

### Installation

1. **Clone or download this repository**

```bash
cd resume-analyzer
```

2. **Create a virtual environment**

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

3. **Install dependencies**

```bash
pip install -r requirements.txt
```

4. **Download spaCy language model**

```bash
python -m spacy download en_core_web_sm
```

5. **Set up environment variables (optional)**

Create a `.env` file in the project root:

```env
SECRET_KEY=your-secret-key-here
FLASK_DEBUG=True
DATABASE_URL=sqlite:///resume_analyzer.db
PORT=5000
```

### Running the Application

1. **Start the Flask server**

```bash
python app.py
```

2. **Open your browser**

Navigate to: `http://localhost:5000`

3. **Upload a resume**

- Click the upload area or drag and drop a PDF/DOCX file
- Wait for the AI analysis to complete
- View detailed results and insights


##  How It Works

### 1. File Processing
- Supports PDF (using PyPDF2 and pdfplumber)
- Supports DOCX (using python-docx)
- Extracts clean text content from documents

### 2. NLP Analysis
- **Skills Extraction**: Matches against 50+ common technical skills
- **Experience Detection**: Parses date ranges and experience mentions
- **Education Parsing**: Identifies degrees, certifications, and institutions
- **Contact Extraction**: Uses regex to find email and phone numbers
- **Entity Recognition**: Leverages spaCy's NER for additional insights

### 3. Scoring Algorithm
- Skills: Up to 40 points (4 points per skill, max 10 skills)
- Experience: Up to 30 points (3 points per year, max 10 years)
- Education: Up to 15 points (5 points per degree, max 3)
- Contact Info: Up to 15 points (7.5 per email/phone)
- **Total: 100 points**

##  Technology Stack

- **Backend**: Flask 3.0, SQLAlchemy, Python 3.8+
- **NLP**: spaCy 3.7 with en_core_web_sm model
- **Document Processing**: PyPDF2, pdfplumber, python-docx
- **Database**: SQLite (easily switchable to PostgreSQL/MySQL)
- **Frontend**: Vanilla JavaScript, CSS3 with modern gradients
- **File Upload**: Werkzeug secure file handling

##  Features in Detail

### Modern UI/UX
- Gradient background design
- Smooth animations and transitions
- Responsive layout for mobile devices
- Drag-and-drop file upload
- Real-time progress indicators
- Color-coded scoring badges

### Security
- Secure filename handling
- File type validation
- Size limit enforcement (16MB)
- SQL injection protection (SQLAlchemy ORM)
- CORS support for API access

### Scalability
- Application factory pattern
- Blueprint-based routing
- Environment-based configuration
- Easy database migration support




**Built with ❤️ using Flask and spaCy**
