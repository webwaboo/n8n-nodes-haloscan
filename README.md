# n8n-nodes-haloscan

This is an n8n community node. It lets you use Haloscan in your n8n workflows.

_Haloscan is an API providing a suite of powerful tools for keyword research, competitor analysis, SERP tracking, expired domain discovery, and more._

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Overview](#Overview)  
[Authentication](#Authentication)  
[Operations](#Operations)  
[Usage](#Usage)  
[Troubleshooting](#Troubleshooting)  
[Resources](#Resources)  
# **Custom App for Haloscan API**

## **Overview**

This custom app integrates with the **Haloscan API**, providing a suite of powerful tools for keyword research, competitor analysis, SERP tracking, expired domain discovery, and more. Designed for **SEO professionals, marketers, and businesses**, this app streamlines data retrieval and analysis, allowing users to make data-driven decisions efficiently.

---

## **Authentication**

To use the app, you must authenticate with your **Haloscan API Key**:

1. Obtain your API key from your **Haloscan account**.
2. Enter the API key in the app settings or provide it when prompted.
3. Ensure the key has **sufficient credits** for API calls.

---

## **Operations**

### **User Credit & Account**
- **Get User Credit** – Retrieves the remaining credit for the current user.

### **Keyword Research**
- **Get Keywords Overview** – Retrieves an SEO overview for a keyword.
- **Find Keywords Match** – Finds keyword variations based on a seed keyword.
- **Find Similar Keywords** – Finds keywords similar to a given keyword.
- **Get Keywords Highlights** – Identifies keyword highlights with high similarity, search volume, CPC, and competition metrics.
- **Find Related Keyword** – Finds related keywords based on a seed keyword.
- **Get Keywords Questions** – Retrieves popular question-based queries related to a keyword.
- **Find Keywords Synonyms** – Finds keyword synonyms.
- **Find Keywords** – Finds related keywords based on a seed keyword.
- **Get Keywords Site Structure** – Analyzes keyword relationships and groups them based on shared statistics.
- **Compare Keywords SERP** – Compares SERPs for a given keyword.
- **Get Keywords Available Dates from SERP** – Retrieves a list of available dates for requested keyword in the SERP data.
- **Get Keywords SERP Page Evolution** – Tracks the ranking history of a specific URL for a given keyword between two dates.
- **Get Keywords Data (Bulk)** – Retrieves bulk keyword data.
- **Scrap Keywords** – Submits a request to refresh keyword data.

### **Domain & URL Analysis**
- **Get a Domain Overview** – Retrieves an SEO overview for a domain or URL.
- **Get Ranking of Domain's Keyword** – Fetches current domain rankings for a domain or URL.
- **Get a Domain's Top Pages** – Retrieves top-performing pages of a domain or URL.
- **Get History of a Domain's Position** – Retrieves the historical ranking positions of a specified domain or URL for various keywords.
- **Get History of a Domain's Pages** – Fetches historical keyword rankings, traffic, and visibility metrics for specific pages of a domain.
- **Get Best Keywords from Page** – Retrieves the best-positioned keywords for the given pages.
- **Get Keywords Data from URL** – Retrieves keyword data for a given URL or domain.
- **Get Domains Data (in Bulk)** – Retrieves bulk domain data for a list of provided domains or URLs.

### **Competitor Analysis**
- **Get Domains Competitors** – Retrieves a list of competitor domains for a given website.
- **Compare Domain's Keywords With Competitors** – Compares keyword rankings between a given website and its competitors.
- **Get Competitors Best Pages** – Retrieves the best-performing pages of competitor domains compared to a given website.

### **Visibility & Trends**
- **Get Visibility Trends of Domains** – Retrieves visibility trend data for a given website or URL.

### **Expired Domains**
- **Get Expired Domains** – Retrieves a list of expired domains with SEO metrics.
- **Reveal Expired Domains** – Reveals expired root domains using the provided keys retrieved from the domains/expired endpoint.

### **Google My Business (GMB) Insights**
- **Get GMB Backlinks** – Retrieves Google My Business (GMB) backlink data for a specified domain or URL.
- **Get Domain's GMB Backlinks Map** – Retrieves the geographical locations of Google My Business (GMB) backlinks for a given domain or URL.
- **Get Domain's Categories (based on GMB Backlinks)** – Retrieves the business categories associated with a given domain or URL based on GMB backlinks.

---

## **Usage**

### **1. Keyword Discovery**
- Enter a seed keyword (e.g., `"digital marketing"`)
- Retrieve **similar keywords**, **question-based keywords**, and **synonyms**  

### **2. Competitor Analysis**
- Input a domain (e.g., `"example.com"`)
- Get **competitor websites**, **keyword ranking comparisons**, and **top-performing competitor pages**  

### **3. SERP Tracking**
- Enter a keyword (e.g., `"best SEO tools"`)
- Compare **SERP rankings across two dates**
- Analyze **position changes** for top URLs  

### **4. Expired Domains**
- Search for **expired domains** related to a niche
- Unlock **domain details** for purchase evaluation  

### **5. GMB Insights**
- Retrieve **business listings** associated with a domain
- Identify **backlinks and business categories**  

---

## **Troubleshooting**

### **1. API Key Issues**
- **Problem:** API key not working.  
- **Solution:** Ensure the key is **correct**, **active**, and has **sufficient credits**.

### **2. No Results Found**
- **Problem:** A keyword or domain returns no data.  
- **Solution:** Try a **broader query**, **check spelling**, or **increase line count**.

### **3. Expired Domain Data Not Revealed**
- **Problem:** Expired domains show limited data.  
- **Solution:** Use the **reveal expired domains** module to unlock details.

### **4. Rate Limit Exceeded**
- **Problem:** Too many API calls in a short time.  
- **Solution:** Space out requests or **upgrade your Haloscan API plan**.

---

## **Resources**
For detailed API documentation, refer to:  
🔗 **[https://tool.haloscan.com/sign-in](#)**

---
