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
            I'm <strong>Crus</strong> (Yash Gholap), a cybersecurity student and aspiring red teamer pursuing a B.E. in Computer Engineering at Mumbai University (2021–2025). My focus areas include ethical hacking, network security, and digital forensics, with a growing interest in offensive security and system defense.
          </p>
          <p>
            I’ve built tools like malware scanners, password vaults, and steganography utilities — all designed to improve security and privacy. I also enjoy solving CTFs on platforms like PicoCTF and recently completed <strong>Advent of Cyber 2024</strong>.
          </p>
          <p>
            I hold the <strong>Google Cybersecurity Professional Certificate</strong> and am pursuing <strong>CRTA, CEH</strong>, with plans for <strong>OSCP</strong> to further strengthen my red teaming skills.
          </p>
          <p>
            From analyzing network traffic to reversing malware, I take a hands-on, detail-driven approach. I’m open to opportunities that challenge me and contribute to building safer, more resilient systems.
          </p>
        </section>

        <hr className="my-10 border-t border-gray-300 dark:border-gray-700" />

        <section>
          <h2 className="border-b border-pink-400 pb-1 mb-4">What I Do</h2>
          <ul>
            <li>Ethical hacking, CTF solving, OSINT investigations</li>
            <li>Full-stack development (Python, TypeScript, Svelte)</li>
            <li>Security tools — malware scanners, steganography, encryption</li>
            <li>AI-powered bots for documents & PDF Q&A</li>
          </ul>
        </section>

        <hr className="my-10 border-t border-gray-300 dark:border-gray-700" />

        <section>
          <h2 className="border-b border-pink-400 pb-1 mb-4">Featured Projects</h2>
          <ul>
            <li><strong>ScanForge:</strong> Custom TCP scanner & banner grabber (Scapy + CLI)</li>
            <li><strong>Password Vault:</strong> Local password manager with 2FA in Python</li>
            <li><strong>AI PDF Bot:</strong> Document summarization & Q&A (DeepSeek-R1 + Ollama)</li>
            <li><strong>MD5 Malware Scanner:</strong> GUI-based malicious file detection using hash comparison</li>
            <li><strong>Image Steganography Tool:</strong> Hide/extract messages in images with LSB (Python + Pillow)</li>
          </ul>
        </section>

        <hr className="my-10 border-t border-gray-300 dark:border-gray-700" />

        <section>
          <h2 className="border-b border-pink-400 pb-1 mb-4">Certifications & Education</h2>
          <ul>
            <li><strong>B.E. Computer Science & Engineering</strong>(Specialization in Cybersecurity, IoT, Blockchain technology) -Mumbai University</li>
            <li><strong>Google Cybersecurity Professional Certificate:</strong> SOC operations, incident response, threat detection</li>
            <li><strong>CRTA (in-progress):</strong> Certified Red Team Analyst</li>
            <li><strong>CEH (in-progress):</strong> Certified Ethical Hacker</li>
            <li><strong>Google Cybersecurity Professional Certificate:</strong> Threat detection, incident response, SOC operations, intrusion detection & prevention, cyber attacks, vulnerability assessments, incident management, network security, threat management, system hardening, Bash scripting, SQL</li>
            <li><strong>Specialized Courses:</strong> Wireshark Analysis, SSRF, SQLi, Authentication Exploits, Bug Bounty Hunting, Web Pentesting</li>
            <li><strong>Hands-on Challenges:</strong> Advent of Cyber 2024, Tata Cybersecurity Analyst Simulation, ANZ Cybersecurity Management Simulation, Mastercard Cybersecurity Simulation</li>
          </ul>
        </section>

        <hr className="my-10 border-t border-gray-300 dark:border-gray-700" />

        <section>
          <h2 className="border-b border-pink-400 pb-1 mb-4">Connect with Me</h2>
          <ul>
            <li>Email: <a href="mailto:yashgholap777@gmail.com">yashgholap777@gmail.com</a></li>
            <li>GitHub: <a href="https://github.com/CRUSVEDER" target="_blank">CRUSVEDER</a></li>
            <li>Twitter/X: <a href="https://x.com/yashg31" target="_blank">@yashg31</a></li>
            <li>LinkedIn: <a href="https://www.linkedin.com/in/yashgholap/" target="_blank">yashgholap</a></li>
            <li>Blog: <a href="https://crusblog.vercel.app" target="_blank">crusblog.vercel.app</a></li>
          </ul>
          <p>
            Always open to collaborations and challenging projects. Let’s connect!
          </p>
        </section>
      </div>
    </Layout>
  )
}

export default About
