const styles = require("./styles.csjs");
const Nanocomponent = require("nanocomponent");
const html = require("bel");
const cn = require("classnames");
const EmailInput = require("./email");
const Title = require("./title");
const Flash = require("./flash");

class ForgotPasswordForm extends Nanocomponent {
  constructor () {
    super();

    this.emit = null;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.startOver = this.startOver.bind(this);
    this.emailInput = new EmailInput();
    this.title = new Title();
    this.flash = new Flash();
  }

  startOver() {
    this.emit("navigate", { page: "login" });
  }

  createElement (state, emit) {
    this.emit = emit;
    this.state = state;

    const { submitting } = state;
    const disabledClass = cn({ [styles.disabled]: submitting });
    const savingClass = cn({ [styles.saving]: submitting });

    return html`
      <div>
        ${this.title.render({ title: "Recover password" }, emit)}
        ${this.flash.render(state, emit)}
        <form onsubmit=${this.handleSubmit} class="${styles.form} ${disabledClass}">
          ${this.emailInput.render(state, emit)}
          <button type="submit" class="${styles.btn} ${savingClass}">
            ${submitting ? "Requesting recovery email" : "Send recovery email"}
          </button>
        </form>
        <button onclick=${this.startOver} class="${styles.btnLink}">Never mind</button>
      </div>
    `;
  }

  update () {
    return true;
  }

  handleSubmit (e) {
    e.preventDefault();

    this.emit("submit-forgot", {
      email: this.emailInput.email
    });

    this.rerender();
  }
}

module.exports = ForgotPasswordForm;
