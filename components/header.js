const styles = require("./styles.csjs");
const Nanocomponent = require("nanocomponent");
const html = require("bel");
const cn = require("classnames");

class Header extends Nanocomponent {
  constructor () {
    super();

    this.page = "login";
    this.emit = "null";

    this.navigateLoginPage = this.navigateLoginPage.bind(this);
    this.navigateSignupPage = this.navigateSignupPage.bind(this);
  }

  navigateLoginPage () {
    this.emit("navigate", "login");
  }

  navigateSignupPage () {
    this.emit("navigate", "signup");
  }

  createElement (state, emit) {
    const { page, message, disabled } = state;
    this.page = page;
    this.emit = emit;
    this.message = message;
    this.disabled = disabled;

    const loginClass = cn({ [styles.active]: page === "login" });
    const signupClass = cn({ [styles.active]: page === "signup" });

    return html`
      <div class="${styles.header}">
        <button disabled=${disabled} class="${styles.btn} ${styles.btnHeader} ${signupClass}"
        onclick=${this.navigateSignupPage}>Sign Up</button>
        <button disabled=${disabled} class="${styles.btn} ${styles.btnHeader} ${loginClass}"
        onclick=${this.navigateLoginPage}>Log In</button>
      </div>
    `;
  }

  update (state, emit) {
    const { page, message, disabled } = state;
    if (this.page !== page) return true;
    if (this.message !== message) return true;
    if (this.disabled !== disabled) return true;
    return false;
  }
}

module.exports = Header;
