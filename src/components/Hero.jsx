import heroBg from "../assets/images/content-main.webp";
import heroBgFallback from "../assets/images/lusso-saigon-mobile.webp";
import lussoMobileHero from "../assets/images/lusso-mobile-hero.png";
import logo1 from "../assets/images/icon-lusso-saigon_3_724x159.png";
import logoMobile from "../assets/images/logo-lusso-saigon.png";
import logo2 from "../assets/images/logo-lusso_724x198.png";
import "../styles/Hero.css";

export default function Hero() {
  return (
    <div className="hero">
      <div className="hero__text">
        <picture>
          <source media="(max-width: 1200px)" srcSet={logoMobile} />
          <img src={logo1} alt="Lusso Saigon" className="hero__logo" />
        </picture>
        <img src={logo2} alt="Lusso" className="hero__logo" />
      </div>
      <div className="hero__images">
        <picture>
          <source media="(max-width: 1200px)" srcSet={lussoMobileHero} />
          <source srcSet={heroBg} type="image/webp" />
          <img
            src={heroBgFallback}
            alt="Lusso Saigon Hero"
            className="hero__image"
          />
        </picture>
      </div>
    </div>
  );
}
