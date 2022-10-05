import { Injectable } from "@angular/core";
// import { ShowToastrService } from "../show-toastr/show-toastr.service";
import { DomSanitizer } from "@angular/platform-browser";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
// import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root",
})
export class UtilsService {
  urlImage = environment.apiUrl;

  keyPressAlpha(event) {
    const inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  keyPressAlphaSpaceNumbers(event) {
    const inp = String.fromCharCode(event.keyCode);
    const charCode = event.which ? event.which : event.keyCode;

    if (
      /[a-zA-Z]/.test(inp) ||
      inp === " " ||
      (charCode <= 57 && charCode >= 48)
    ) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  keyPressAlphaSpace(event) {
    const inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z 0-9,.-]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  keyPressDateNumbers(event) {
    const inp = String.fromCharCode(event.keyCode);
    if (/[0-9/-]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  keyPressNumbers(event) {
    const charCode = event.which ? event.which : event.keyCode;
    // Only Numbers 0-9
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  keyPressDecimalNumbers(event) {
    const charCode = event.which ? event.which : event.keyCode;
    // Only Numbers 0-9
    if (charCode < 46 || charCode > 57) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  constructor(
    public sanitizer: DomSanitizer,
    // private showToastr: ToastrService,
    private httpClient: HttpClient
  ) {}

  validatePhone(cellphone) {
    return !(
      cellphone.length !== 8 ||
      cellphone[0] !== "5" ||
      isNaN(Number(cellphone))
    );
  }

  errorHandle(error, nomenclator?, action?) {
    let msg = nomenclator
      ? action
        ? "Error " + action + " " + nomenclator
        : "Error " + action
      : "La respuesta del servidor ha fallado, chequee su conexión de red o póngase en contacto con un administrador de sistema.";
    if (error.errors && error.errors.length) {
      error.errors.forEach((e) => {
        // this.showToastr.error(e.title || e.message, e.field);
      });
      return;
    } else if (error.error && error.error.errors) {
      error.error.errors.forEach((e) => {
        // this.showToastr.error(e.title || e.message, e.field);
      });
      return;
    } else if (error.error && error.error.length) {
      error.error.forEach((e) => {
        // this.showToastr.error(e.title || e.message, e.field);
      });
      return;
    } else if (error.error) {
      msg = error.error.message;
      if (!msg) {
        msg =
          "La respuesta del servidor ha fallado, chequee su conexión de red o póngase en contacto con un administrador de sistema.";
      }
      // this.showToastr.error(msg, "Error");
    }
  }
}
