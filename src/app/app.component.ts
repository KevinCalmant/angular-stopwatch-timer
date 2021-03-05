import { Component, Input } from "@angular/core";
import { timer } from "rxjs";
import { takeWhile, tap } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  @Input() maxTime: number = 90;

  animAttribute: string;
  counter: number = this.maxTime;
  private _a = 0;

  ngOnInit() {
    timer(1000, 1000)
      .pipe(
        takeWhile(() => this.counter > 0),
        tap(() => (this.counter -= 1))
      )
      .subscribe(() => {
        this._draw();
      });
  }

  private _draw(): void {
    this._a++;
    this._a %= 360;
    const r = (this._a * Math.PI) / (this.maxTime / 2);
    const x = Math.sin(r) * 25;
    const y = Math.cos(r) * -25;
    const mid = this._a > this.maxTime / 2 ? 1 : 0;
    this.animAttribute =
      "M 0 0 v -25 A 25 25 1 " + mid + " 1 " + x + " " + y + " z";
  }
}
