import Layout from "@/components/layout"
import ResumeBanner from "@/components/resume-banner"

const About = () => {
  return (
    
    <Layout>
      <h1 className="mb-8 w-full max-w-7xl text-8xl font-bold tracking-tighter leading-tight opacity-0 md:pr-8 lg:mb-12 dark:text-gray-100 animate-fade_in_up_10">
        about.
        
      </h1>
      <ResumeBanner />

      <div className="prose dark:prose-invert max-w-3xl text-lg animate-fade_in_up_10 delay-200">
        <section>
        <p>
          I'm <strong>Crus</strong> (Yash Gholap), a cybersecurity student and aspiring red teamer pursuing a B.E. in Computer Engineering at Mumbai University (2021–2025). My focus lies in ethical hacking, network security, and digital forensics — with a strong interest in offensive security and system defense.
        </p>
        <p>
          I’ve built practical tools like malware scanners, password vaults, and steganography utilities — all aimed at strengthening digital privacy and security. I enjoy solving CTFs on platforms like PicoCTF and participated in <strong>Advent of Cyber 2024</strong>, where I honed my real-world problem-solving skills.
        </p>
        <p>
          I’ve completed the <strong>Google Cybersecurity Professional Certificate</strong> and am currently pursuing the <strong>CRTA (Certified Red Team Analyst)</strong> certification, with plans to follow it up with <strong>CEH (Certified Ethical Hacker)</strong> to further expand my offensive security toolkit.
        </p>
        <p>
          Whether it’s analyzing network traffic, reversing malware, or uncovering hidden traces, I bring a hands-on, detail-driven approach. I’m open to opportunities that challenge me and allow me to contribute to building safer, more resilient systems.
        </p>



        </section>

        <hr className="my-10 border-t border-gray-300 dark:border-gray-700" />

        <section>
          <h2 className="border-b border-pink-400 pb-1 mb-4">🔧 What I Do</h2>
          <ul>
            <li>Ethical hacking, CTF solving, and OSINT investigations</li>
            <li>Full-stack development with Python, TypeScript, and Svelte</li>
            <li>Cybersecurity tooling — steganography, malware scanners, encryption tools</li>
            <li>AI-powered document bots and PDF Q&A systems</li>
          </ul>
        </section>

        <hr className="my-10 border-t border-gray-300 dark:border-gray-700" />

        <section>
          <h2 className="border-b border-pink-400 pb-1 mb-4">🛠 Featured Projects</h2>
          <ul>
            <li><strong>ScanForge:</strong> A custom TCP scanner & banner grabber (Scapy + CLI)</li>
            <li><strong>Password Vault:</strong> Secure local password manager with 2FA in Python</li>
            <li><strong>AI PDF Bot:</strong> Document summarization & Q&A using DeepSeek-R1 + Ollama</li>
            <li><strong>MD5 Malware Scanner:</strong> GUI-based scanner using MD5 hash comparison to detect malicious files</li>
            <li><strong>Image Steganography Tool:</strong> CLI tool to hide and extract secret messages in images using LSB technique (Python + Pillow)</li>
          </ul>
        </section>

        <hr className="my-10 border-t border-gray-300 dark:border-gray-700" />

        <section>
          <h2 className="border-b border-pink-400 pb-1 mb-4">📜 Certifications & Education</h2>
          <ul>
            <li><strong>2025:</strong> Bachelor of Engineering (B.E.) in Computer Engineering — Mumbai University (Cybersecurity, IoT, Blockchain)</li>
            <li><strong>Google Cybersecurity Professional Certificate:</strong> Foundational cybersecurity course on threat detection, incident response, and SOC operations</li>
            <li><strong>Python Programming:</strong> Practical scripting and software logic building in Python</li>
            <li><strong>Wireshark: Packet Analysis & Ethical Hacking:</strong> In-depth network traffic analysis using Wireshark for real-time packet inspection</li>
            <li><strong>Mastering Server-Side Request Forgery (SSRF):</strong> Exploitation of SSRF vulnerabilities through real-world attack chains</li>
            <li><strong>Mastering SQL Injection:</strong> Practical hands-on exploitation of SQLi vulnerabilities across web applications</li>
            <li><strong>Mastering Authentication Vulnerabilities:</strong> Techniques to bypass and exploit broken authentication mechanisms</li>
            <li><strong>Learn Ethical Hacking From Scratch:</strong> Complete penetration testing and vulnerability exploitation training</li>
            <li><strong>Learn Python & Ethical Hacking From Scratch:</strong> Combined course on ethical hacking and Python scripting fundamentals</li>
            <li><strong>Learn Bug Bounty Hunting & Web Security Testing From Scratch:</strong> Bug bounty techniques with a focus on recon, XSS, IDOR, and authentication flaws</li>
            <li><strong>Website Hacking / Penetration Testing:</strong> Web application security testing including injection, misconfigurations, and XSS</li>
            <li><strong>Advent of Cyber 2024:</strong> CTF challenge series covering web security, privilege escalation, and network forensics</li>
            <li><strong>Tata Cybersecurity Analyst Simulation:</strong> Real-world scenario-based threat detection and response simulation</li>
            <li><strong>ANZ Cyber Security Management Simulation:</strong> Practical tasks involving threat modeling, email phishing analysis, and SOC workflows</li>
            <li><strong>Mastercard Cybersecurity Simulation:</strong> Realistic cybersecurity challenge simulation covering system hardening and attack analysis</li>
          </ul>
        </section>

        <hr className="my-10 border-t border-gray-300 dark:border-gray-700" />

        <section>
          <h2 className="border-b border-pink-400 pb-1 mb-4">🌍 Connect with Me</h2>
          <ul>
            <li>Email: <a href="mailto:yashgholap777@gmail.com">yashgholap777@gmail.com</a></li>
            <li>GitHub: <a href="https://github.com/CRUSVEDER" target="_blank">CRUSVEDER</a></li>
            <li>Twitter/X: <a href="https://x.com/yashg31" target="_blank">@yashg31</a></li>
            <li>LinkedIn: <a href="https://www.linkedin.com/in/yashgholap/" target="_blank">yashgholap</a></li>
            <li>Blog: <a href="https://crusblog.vercel.app" target="_blank">crusblog.vercel.app</a></li>
            <li>Portfolio: <a href="https://crus.website" target="_blank">crus.website</a></li>
          </ul>
              <p>
                I'm always looking for new projects or opportunities to share my knowledge and skills. If you're interested in working with me, please don't hesitate to reach out.
              </p>
              
        </section>
      </div>
      
    </Layout>
  )
}

export default About
