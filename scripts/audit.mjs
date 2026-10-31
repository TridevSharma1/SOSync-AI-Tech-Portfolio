// Full automated audit script for SOSync AI Tech Portfolio
const BASE_URL = "http://localhost:3000";

const results = [];

function record(category, testName, passed, details = "") {
  results.push({ category, testName, status: passed ? "PASS" : "FAIL", details });
  const icon = passed ? "✅" : "❌";
  console.log(`${icon} [${category}] ${testName} - ${passed ? "PASS" : "FAIL"} ${details ? `(${details})` : ""}`);
}

async function audit() {
  console.log("=================================================");
  console.log("🚀 STARTING FULL AUDIT FOR SOSYNC AI TECH PORTFOLIO");
  console.log(`Target URL: ${BASE_URL}`);
  console.log("=================================================\n");

  // 1. PUBLIC WEB ROUTES AUDIT
  console.log("--- 1. AUDITING PUBLIC FRONTEND PAGES ---");
  const pages = [
    { path: "/", name: "Homepage" },
    { path: "/portfolio", name: "Portfolio Grid Page" },
    { path: "/testimonials", name: "Testimonials Page" },
    { path: "/our-story", name: "Our Story Page" },
    { path: "/contact", name: "Contact & Enquiry Page" },
    { path: "/admin/login", name: "Admin Login Page" },
    { path: "/admin", name: "Admin Dashboard Page" },
  ];

  for (const p of pages) {
    try {
      const start = Date.now();
      const res = await fetch(`${BASE_URL}${p.path}`);
      const duration = Date.now() - start;
      const text = await res.text();
      const passed = res.status === 200 && text.includes("<!DOCTYPE html>");
      record("Pages", `${p.name} (${p.path})`, passed, `Status: ${res.status}, Latency: ${duration}ms`);
    } catch (err) {
      record("Pages", `${p.name} (${p.path})`, false, err.message);
    }
  }

  // 2. PUBLIC API ENDPOINTS AUDIT
  console.log("\n--- 2. AUDITING PUBLIC API ENDPOINTS ---");
  try {
    const projRes = await fetch(`${BASE_URL}/api/projects`);
    const projJson = await projRes.json();
    record("API", "GET /api/projects", projRes.status === 200 && Array.isArray(projJson.projects), `Count: ${projJson.projects?.length}`);
  } catch (e) {
    record("API", "GET /api/projects", false, e.message);
  }

  try {
    const testRes = await fetch(`${BASE_URL}/api/testimonials`);
    const testJson = await testRes.json();
    record("API", "GET /api/testimonials (public approved)", testRes.status === 200 && Array.isArray(testJson.testimonials), `Count: ${testJson.testimonials?.length}`);
  } catch (e) {
    record("API", "GET /api/testimonials", false, e.message);
  }

  try {
    const storyRes = await fetch(`${BASE_URL}/api/story-360`);
    const storyJson = await storyRes.json();
    record("API", "GET /api/story-360 (360 Carousel)", storyRes.status === 200 && Array.isArray(storyJson.slides), `Count: ${storyJson.slides?.length}`);
  } catch (e) {
    record("API", "GET /api/story-360", false, e.message);
  }

  try {
    const setRes = await fetch(`${BASE_URL}/api/settings`);
    const setJson = await setRes.json();
    record("API", "GET /api/settings", setRes.status === 200 && setJson.settings?.company?.name, `Company: ${setJson.settings?.company?.shortName}`);
  } catch (e) {
    record("API", "GET /api/settings", false, e.message);
  }

  try {
    const meRes = await fetch(`${BASE_URL}/api/auth/me`);
    const meJson = await meRes.json();
    record("API", "GET /api/auth/me (unauthenticated)", meRes.status === 200 && meJson.isAdmin === false, `isAdmin: ${meJson.isAdmin}`);
  } catch (e) {
    record("API", "GET /api/auth/me", false, e.message);
  }

  // 3. CONTACT FORM ENQUIRY SUBMISSION AUDIT
  console.log("\n--- 3. AUDITING CLIENT CONTACT FORM SUBMISSION ---");
  let testEnquiryId = null;
  try {
    const enqRes = await fetch(`${BASE_URL}/api/enquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Audit Automation Agent",
        email: "audit.test@sosyncaitech.in",
        phone: "+91 99999 88888",
        company: "SOSync QA Lab",
        subject: "Full Site Verification Audit",
        message: "Automated test enquiry verifying backend persistence and notification flow.",
      }),
    });
    const enqJson = await enqRes.json();
    testEnquiryId = enqJson.enquiry?._id;
    record("Enquiries", "POST /api/enquiries (Contact submission)", enqRes.status === 201 && testEnquiryId, `Created ID: ${testEnquiryId}`);
  } catch (e) {
    record("Enquiries", "POST /api/enquiries", false, e.message);
  }

  // 4. TESTIMONIAL CLIENT SUBMISSION AUDIT
  console.log("\n--- 4. AUDITING CLIENT TESTIMONIAL SUBMISSION & APPROVAL WORKFLOW ---");
  let testReviewId = null;
  try {
    const reviewRes = await fetch(`${BASE_URL}/api/testimonials`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Priya Sharma",
        role: "Director of Technology",
        company: "InnovateX Solutions",
        rating: 5,
        review: "SOSync team delivered top-notch cloud migration with zero downtime.",
      }),
    });
    const reviewJson = await reviewRes.json();
    testReviewId = reviewJson.testimonial?._id;
    const isPending = reviewJson.testimonial?.status === "pending";
    record("Testimonials", "POST /api/testimonials (Visitor submit -> pending)", reviewRes.status === 201 && isPending, `Status: ${reviewJson.testimonial?.status}`);
  } catch (e) {
    record("Testimonials", "POST /api/testimonials", false, e.message);
  }

  // 5. ADMIN AUTHENTICATION & SECURITY AUDIT
  console.log("\n--- 5. AUDITING ADMIN AUTHENTICATION & ACCESS CONTROL ---");
  // Check unauthorized access protection
  try {
    const unauthProjectRes = await fetch(`${BASE_URL}/api/projects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Hack attempt" }),
    });
    record("Security", "POST /api/projects without token (Reject 401)", unauthProjectRes.status === 401, `Status: ${unauthProjectRes.status}`);
  } catch (e) {
    record("Security", "POST /api/projects 401 check", false, e.message);
  }

  // Authenticate as Admin
  let adminToken = null;
  try {
    const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "tushar4062@gmail.com",
        password: "mainadmin@700",
      }),
    });
    const loginJson = await loginRes.json();
    adminToken = loginJson.token;
    record("Auth", "POST /api/auth/login (Admin Credential Match)", loginRes.status === 200 && Boolean(adminToken), `Token length: ${adminToken?.length}`);
  } catch (e) {
    record("Auth", "POST /api/auth/login", false, e.message);
  }

  // Verify authenticated session
  if (adminToken) {
    try {
      const authMeRes = await fetch(`${BASE_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      const authMeJson = await authMeRes.json();
      record("Auth", "GET /api/auth/me with Bearer Token", authMeRes.status === 200 && authMeJson.isAdmin === true, `Role: ${authMeJson.role}`);
    } catch (e) {
      record("Auth", "GET /api/auth/me with Token", false, e.message);
    }
  }

  // 6. ADMIN CRUD OPERATIONS AUDIT
  console.log("\n--- 6. AUDITING ADMIN CRUD OPERATIONS ---");
  if (adminToken) {
    // 6a. Admin Project CRUD (Create -> Read -> Update -> Delete)
    let createdProjectId = null;
    try {
      const createRes = await fetch(`${BASE_URL}/api/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          title: "Audit Test Super App",
          category: "Mobile & AI",
          href: "https://example.com/audit-app",
          image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop",
          description: "Full-stack mobile application with realtime sync.",
          tags: ["Flutter", "FastAPI", "MongoDB"],
          showIn360: true,
          order: 99,
        }),
      });
      const createJson = await createRes.json();
      createdProjectId = createJson.project?._id;
      record("CRUD - Projects", "Create Project (POST /api/projects)", createRes.status === 201 && Boolean(createdProjectId), `ID: ${createdProjectId}`);
    } catch (e) {
      record("CRUD - Projects", "Create Project", false, e.message);
    }

    if (createdProjectId) {
      try {
        const updateRes = await fetch(`${BASE_URL}/api/projects/${createdProjectId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken}`,
          },
          body: JSON.stringify({
            title: "Audit Test Super App (Updated Edition)",
          }),
        });
        const updateJson = await updateRes.json();
        record("CRUD - Projects", "Update Project (PUT /api/projects/:id)", updateRes.status === 200 && updateJson.project?.title?.includes("Updated"), `Updated title verified`);
      } catch (e) {
        record("CRUD - Projects", "Update Project", false, e.message);
      }

      try {
        const delRes = await fetch(`${BASE_URL}/api/projects/${createdProjectId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${adminToken}` },
        });
        const delJson = await delRes.json();
        record("CRUD - Projects", "Delete Project (DELETE /api/projects/:id)", delRes.status === 200 && delJson.success, `Project deleted`);
      } catch (e) {
        record("CRUD - Projects", "Delete Project", false, e.message);
      }
    }

    // 6b. Admin Testimonial Approval & Delete
    if (testReviewId) {
      try {
        const approveRes = await fetch(`${BASE_URL}/api/testimonials/${testReviewId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken}`,
          },
          body: JSON.stringify({ status: "approved" }),
        });
        const approveJson = await approveRes.json();
        record("CRUD - Testimonials", "Approve Testimonial (PUT /api/testimonials/:id)", approveRes.status === 200 && approveJson.testimonial?.status === "approved", `Status: approved`);
      } catch (e) {
        record("CRUD - Testimonials", "Approve Testimonial", false, e.message);
      }

      try {
        const delRevRes = await fetch(`${BASE_URL}/api/testimonials/${testReviewId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${adminToken}` },
        });
        record("CRUD - Testimonials", "Delete Testimonial (DELETE /api/testimonials/:id)", delRevRes.status === 200, `Testimonial cleaned up`);
      } catch (e) {
        record("CRUD - Testimonials", "Delete Testimonial", false, e.message);
      }
    }

    // 6c. Admin 360 Slide CRUD
    let testSlideId = null;
    try {
      const slideCreateRes = await fetch(`${BASE_URL}/api/story-360`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop",
          title: "AI Neural Network Architecture",
          alt: "Circuit diagram",
        }),
      });
      const slideJson = await slideCreateRes.json();
      testSlideId = slideJson.slide?._id;
      record("CRUD - 360 Section", "Create 360 Slide (POST /api/story-360)", slideCreateRes.status === 201 && Boolean(testSlideId), `Slide ID: ${testSlideId}`);
    } catch (e) {
      record("CRUD - 360 Section", "Create 360 Slide", false, e.message);
    }

    if (testSlideId) {
      try {
        const delSlideRes = await fetch(`${BASE_URL}/api/story-360/${testSlideId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${adminToken}` },
        });
        record("CRUD - 360 Section", "Delete 360 Slide (DELETE /api/story-360/:id)", delSlideRes.status === 200, `Slide deleted`);
      } catch (e) {
        record("CRUD - 360 Section", "Delete 360 Slide", false, e.message);
      }
    }

    // 6d. Admin Enquiries Read / Delete
    if (testEnquiryId) {
      try {
        const markRes = await fetch(`${BASE_URL}/api/enquiries/${testEnquiryId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken}`,
          },
          body: JSON.stringify({ read: true }),
        });
        const markJson = await markRes.json();
        record("CRUD - Enquiries", "Mark Enquiry Read (PUT /api/enquiries/:id)", markRes.status === 200 && markJson.enquiry?.read === true, `Marked read`);
      } catch (e) {
        record("CRUD - Enquiries", "Mark Enquiry Read", false, e.message);
      }

      try {
        const delEnqRes = await fetch(`${BASE_URL}/api/enquiries/${testEnquiryId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${adminToken}` },
        });
        record("CRUD - Enquiries", "Delete Enquiry (DELETE /api/enquiries/:id)", delEnqRes.status === 200, `Enquiry cleaned up`);
      } catch (e) {
        record("CRUD - Enquiries", "Delete Enquiry", false, e.message);
      }
    }

    // 6e. Admin Settings & Social Media Links Update
    try {
      const setUpdateRes = await fetch(`${BASE_URL}/api/settings`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          social: {
            linkedin: "https://www.linkedin.com/company/sosyncaitech/posts/?feedView=all",
            twitter: "https://twitter.com/sosyncaitech",
            instagram: "https://www.instagram.com/sosyncaitech_multimediaa?obrf=MWtxODgwdGo2YWpzZg==",
            facebook: "https://facebook.com/sosyncaitech",
            github: "https://github.com/sosyncaitech",
            youtube: "https://www.youtube.com/@SOSyncAITech",
          },
          maintenanceMode: false,
        }),
      });
      const setJson = await setUpdateRes.json();
      record("CRUD - Settings", "Update Social & Maintenance (PUT /api/settings)", setUpdateRes.status === 200 && setJson.settings?.maintenanceMode === false, `Maintenance: OFF, Socials synced`);
    } catch (e) {
      record("CRUD - Settings", "Update Settings", false, e.message);
    }
  }

  // 7. SUMMARY
  console.log("\n=================================================");
  const total = results.length;
  const passedCount = results.filter((r) => r.status === "PASS").length;
  const failedCount = total - passedCount;
  console.log(`📊 AUDIT SUMMARY: Total: ${total} | Passed: ${passedCount} | Failed: ${failedCount}`);
  console.log(`Success Rate: ${((passedCount / total) * 100).toFixed(1)}%`);
  console.log("=================================================");
}

audit();
