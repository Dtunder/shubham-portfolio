# 100 Discovery & Compliance Questions for AI Consulting & Freelance Preparation
**Author:** Shubham Jayswal
**Purpose:** Client Audits, Technical Scoping, and Business Readiness

---

## Section 1: Industrial AI & Telemetry (Maschinenbau)
*Focus: Data acquisition, predictive maintenance, and shop-floor integration.*

1. What specific protocols (OPC UA, MQTT, Modbus) are currently used by your PLC/SPS systems?
2. Are your machines currently equipped with edge gateways or are they connected directly to the corporate network?
3. What is the current sampling rate for telemetry data (e.g., vibration, temperature, power consumption)?
4. Is there an existing "Data Historian" (like OSIsoft PI or InfluxDB) where historical machine states are stored?
5. How do you handle "blind spots" where legacy machinery lacks digital interfaces (Retrofitting requirements)?
6. What are the key performance indicators (KPIs) you aim to optimize (OEE, MTBF, MTTR)?
7. Do you have a labeled dataset of previous machine failures or maintenance logs for supervised learning?
8. How is the synchronization of time-stamps handled across different sensors and machines?
9. Are there any strict latency requirements for AI-driven real-time control loops?
10. What is the environmental "noise" level (electrical interference) that could affect sensor data integrity?
11. How do you manage the lifecycle of machine firmware and sensor calibration?
12. Is there a physical space constraint for installing additional Edge AI compute units on the shop floor?
13. What is the current process for manual quality inspection, and where are the primary bottlenecks?
14. Are your operators trained to interact with digital dashboards, or is a "low-code/no-code" interface preferred?
15. How do you handle data transmission in areas with poor industrial Wi-Fi or cellular coverage?
16. What safety certifications (SIL/PL) must the AI-driven system respect when interacting with actuators?
17. Is there a "Digital Twin" strategy already in place, or are we starting from raw telemetry?
18. How much historical data is available for "Normal" operating conditions vs. "Anomalous" conditions?
19. Can the data be pre-processed at the edge to reduce bandwidth costs for cloud transmission?
20. What are the specific power constraints for edge devices mounted on mobile machinery?
21. How do you validate the accuracy of virtual sensors (soft sensors) against physical measurements?
22. Is there a requirement for multi-tenant data isolation if the machine is used by different departments?
23. What is the backup strategy for shop-floor data in case of a network outage?
24. How do you currently track the ROI of maintenance activities?
25. Are there specific VDI/VDE guidelines that your organization strictly follows for automation?

---

## Section 2: Secure Local RAG & IP Protection
*Focus: Data privacy, Large Language Models, and Intellectual Property.*

26. Does your internal documentation contain "Streng Geheim" (Strictly Confidential) trade secrets that cannot leave the premises?
27. What is the total volume of unstructured data (PDFs, CAD specs, Word docs) to be indexed?
28. Is there a preference for specific open-source models (Llama 3, Mistral, Mixtral) for local deployment?
29. What hardware is available for hosting (NVIDIA H100s, A100s, or consumer-grade RTX GPUs)?
30. How do you manage user access control (LDAP/Active Directory) for the RAG system?
31. Is the environment completely "Air-Gapped" or is a restricted outbound connection allowed for updates?
32. What vector database (ChromaDB, Qdrant, Milvus) aligns with your existing IT stack?
33. How do you handle document versioning (e.g., ensuring the RAG doesn't cite an obsolete spec)?
34. What is the required "Context Window" for your most complex technical manuals?
35. How do we quantify "Hallucination" risks for your specific technical domain?
36. Is there a requirement for "Citations" where the AI must point to the exact page/paragraph in the source PDF?
37. How will the model be fine-tuned or "LoRA-adapted" for your industry-specific jargon?
38. What are the GDPR (DSGVO) implications if personal names or client data are found in technical logs?
39. Can we utilize Quantization (4-bit/8-bit) to run models on existing infrastructure without losing precision?
40. How do you plan to handle "Multi-modal" RAG (e.g., querying blueprints and images)?
41. What is the strategy for re-indexing data when a source document is updated or deleted?
42. Is there a "Human-in-the-loop" requirement for validating AI-generated technical advice?
43. How do you protect the Vector Embeddings themselves from being reverse-engineered?
44. What is the maximum acceptable latency for a query response (Internal vs. External use)?
45. Are there restrictions on using third-party APIs (OpenAI/Anthropic) even for non-sensitive data?
46. How do you handle "Prompt Injection" risks in an internal deployment?
47. Is there a need for multilingual support (e.g., German manuals vs. English engineering notes)?
48. How do you measure the "Relevance" of the retrieved document chunks (mAP, Hit Rate)?
49. Can the RAG system be integrated into existing tools like Slack, MS Teams, or a custom Portal?
50. What is the long-term maintenance plan for model weights and software dependencies?

---

## Section 3: Streamlit BI & Scenarios (Excel Conversion)
*Focus: Dashboarding, data visualization, and replacing legacy spreadsheets.*

51. Which complex Excel formulas or VBA Macros are the most critical to replicate in Python?
52. Who are the primary end-users of this dashboard (Executives, Engineers, or Sales)?
53. Does the data need to be "Live" (Socket/API) or is a daily CSV upload sufficient?
54. What are the "What-If" parameters the users need to toggle (Price, Lead Time, Resource availability)?
55. Is there a requirement for "Write-back" functionality (saving dashboard inputs back to a SQL database)?
56. How do you currently handle "Data Cleaning" for inconsistent Excel entries?
57. What is the preferred hosting environment (Streamlit Community Cloud, Docker on AWS, or On-prem)?
58. Do you need "Role-Based Access Control" (RBAC) within the Streamlit app?
59. What are the most important chart types for your data (Gantt, Heatmaps, 3D surface plots)?
60. How should the dashboard handle large datasets to avoid "Page Unresponsive" browser errors?
61. Is there a requirement for "PDF Export" of the generated reports/scenarios?
62. How do we handle "Multi-page" navigation for different business units?
63. Are there specific corporate branding guidelines (colors, logos, fonts) to be implemented?
64. How often do the underlying data schemas change in your source systems?
65. Is there a need for "Session State" management to keep user inputs across different tabs?
66. How do you plan to handle "User Feedback" (comments/ratings) directly within the app?
67. What is the integration strategy with Snowflake, BigQuery, or local PostgreSQL?
68. Can we use "Cache" mechanisms to speed up heavy data processing tasks?
69. Is there a requirement for "Mobile-friendly" layouts for on-the-go monitoring?
70. How do you currently share findings from Excel (Email, SharePoint, Meetings)?
71. What is the "Source of Truth" if the dashboard conflicts with an old spreadsheet?
72. Do you need automated "Alerts" (Email/Webhook) based on specific data thresholds?
73. How do we handle "Historical Comparison" (YTD, YoY) in the visual interface?
74. Is there a need for "Collaborative Filtering" or shared views between users?
75. What is the success metric for this migration (Time saved, Error reduction, Clarity)?

---

## Section 4: German Freelance Bureaucracy & Visas
*Focus: §21 Abs. 6 AufenthG, tax compliance, and social security.*

76. Does your current visa allow for "Selbstständige Tätigkeit" or do you need a "Zusatzblatt" change?
77. Have you prepared the "Business Plan" required for the Ausländerbehörde (§21 Abs. 6)?
78. Do you have a "Letter of Intent" (LOI) from at least two potential German clients?
79. What is your strategy for proving "Economic Interest" or "Regional Demand" for your AI services?
80. Have you applied for a "Steuernummer" (Tax Number) via the "Fragebogen zur steuerlichen Erfassung"?
81. Do you know the difference between "Gewerbe" (Trade) and "Freiberufler" (Liberal Profession) for your role?
82. How do you plan to handle "Kleinunternehmerregelung" (§19 UStG) vs. regular VAT (Umsatzsteuer)?
83. Have you secured "Berufshaftpflichtversicherung" (Professional Liability Insurance) for IT consulting?
84. Is your health insurance (Krankenkasse) notified of your transition to full-time freelancing?
85. How will you track "Betriebsausgaben" (Business Expenses) for your EÜR (Income Surplus Statement)?
86. Do you have a separate "Geschäftskonto" (Business Bank Account) to isolate personal and professional funds?
87. What is your strategy to avoid "Scheinselbstständigkeit" (Pseudo-self-employment) with a single main client?
88. Are you aware of the "Rentenversicherungspflicht" (Pension Insurance) for certain self-employed educators/consultants?
89. How do you calculate your "Stundensatz" (Hourly Rate) to cover tax, insurance, and downtime?
90. Do you have a "Finanzplan" covering the first 3 years of your freelance activity?
91. How do you handle "ELSTER" for monthly or quarterly "Umsatzsteuer-Voranmeldung"?
92. Is your "Lebenslauf" (CV) optimized for the German freelance market (Project-based)?
93. Have you consulted a "Steuerberater" (Tax Advisor) regarding international clients and VAT?
94. Do you have a template for "Rechnungen" (Invoices) that complies with §14 UStG requirements?
95. How do you document your "Akquise" (Client Acquisition) efforts for the immigration office?
96. What is your "Puffer" (Buffer) for months with low project volume or illness?
97. Are you eligible for the "Gründungszuschuss" (Startup Grant) from the Agentur für Arbeit?
98. How do you handle "DSGVO-Konformität" (GDPR) in your own business operations?
99. Do you have an "Impressum" and "Datenschutzerklärung" for your professional portfolio website?
100. What is your "Exit-Strategy" or pivot plan if the first 6 months don't meet financial targets?
