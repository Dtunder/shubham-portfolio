import argparse
import sys

def generate_email(company_name, tech_stack, focus_area, your_name="Shubham Jayswal"):
    """
    Generates a customized cold-outreach email.
    """
    
    template = f"""
Subject: Supporting {company_name}'s {focus_area} efforts with Python Automation & AI

Hi [Contact Name],

I've been following {company_name}'s recent work in {focus_area}, particularly your use of {tech_stack}. 

As an RWTH Aachen Mechatronics student specializing in Python automation, AI agents (LangChain/CrewAI), and Streamlit dashboards, I see a great opportunity to contribute to your team. I excel at bridgeing the gap between complex engineering simulations and user-friendly data tools.

Specifically, I have experience in:
- Developing autonomous AI agents for workflow automation.
- Building interactive Streamlit dashboards for real-time data visualization.
- Scripting complex engineering simulations in Python.

I would love to learn more about how {company_name} is scaling its {focus_area} initiatives and discuss how my skills as a working student could support your R&D or prototyping goals.

Are you available for a brief 10-minute introductory call next week?

Best regards,

{your_name}
RWTH Aachen University
[Link to Portfolio/LinkedIn]
"""
    return template

def main():
    parser = argparse.ArgumentParser(description="Generate customized cold-outreach emails.")
    parser.add_argument("--company", required=True, help="Target company name")
    parser.add_argument("--tech", required=True, help="Relevant tech stack (e.g., 'Python, RAG, PyTorch')")
    parser.add_argument("--focus", required=True, help="Specific focus area (e.g., 'Predictive Maintenance')")
    parser.add_argument("--output", help="Optional: file path to save the email")

    args = parser.parse_args()

    email_content = generate_email(args.company, args.tech, args.focus)

    print("\n--- GENERATED EMAIL ---\n")
    print(email_content)
    print("------------------------\n")

    if args.output:
        with open(args.output, "w") as f:
            f.write(email_content)
        print(f"Email saved to {args.output}")

if __name__ == "__main__":
    main()
