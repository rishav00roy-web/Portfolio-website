interface SocialIconProps {
  href: string;
  label: string;
  username: string;
  bio: string;
  icon: React.ReactNode;
  accentColor: string;
  initials: string;
}

export default function SocialIcon({ href, label, username, bio, icon, accentColor, initials }: SocialIconProps) {
  return (
    <div className="tooltip-container" style={{ ["--accent" as string]: accentColor }}>
      <div className="tooltip">
        <div className="profile">
          <div className="user">
            <div className="img">{initials}</div>
            <div className="details">
              <span className="name">{label}</span>
              <span className="username">{username}</span>
            </div>
          </div>
          <p className="about">{bio}</p>
        </div>
      </div>
      <a href={href} target="_blank" rel="noopener noreferrer" className="icon">
        <div className="layer">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span className="fab">{icon}</span>
        </div>
        <span className="text">{label}</span>
      </a>
    </div>
  );
}
