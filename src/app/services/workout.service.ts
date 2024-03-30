import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  public static get SPRINTS(): number[] {
    return Array.from({length: 10}, (_, index) => index + 1);
  }

  private _sprints: number = 5;
  private _warmup: number = 240;
  private _sprint: number = 30;
  private _rest: number = 90;
  private _cooldown: number = 240;

  public get sprints(): number {
    return this._sprints;
  }

  public set sprints(value: number) {
    this._sprints = value;
    if (this._sprints < 0) this._sprints = 0;
  }

  public get warmup(): number {
    return this._warmup;
  }

  public set warmup(value: number) {
    this._warmup = value;
    if (this._warmup < 0) this._warmup = 0;
  }

  public get sprint(): number {
    return this._sprint;
  }

  public set sprint(value: number) {
    this._sprint = value;
    if (this._sprint < 0) this._sprint = 0;
  }

  public get rest(): number {
    return this._rest;
  }

  public set rest(value: number) {
    this._rest = value;
    if (this._rest < 0) this._rest = 0;
  }

  public get cooldown(): number {
    return this._cooldown;
  }

  public set cooldown(value: number) {
    this._cooldown = value;
    if (this._cooldown < 0) this._cooldown = 0;
  }
}
