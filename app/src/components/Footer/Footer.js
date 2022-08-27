import style from "./footer.module.css";

function Footer() {
  return (
    <footer className={style.footer}>
      <p>Made with 💜 by Afiq and Naim</p>
      <p>
        Icon Credits to <a href="https://www.flaticon.com/">Flaticon</a> and
        Images Courtesy of <a href="https://www.google.com/">Google</a>
      </p>
    </footer>
  );
}

export default Footer;
