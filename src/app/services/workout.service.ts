import {Injectable} from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  public static get SPRINTS(): number[] {
    return Array.from({length: 10}, (_, index) => index + 1);
  }

  public constructor(private readonly router: Router) {
  }

  private _sprints: number = 5;
  private _warmup: number = 240;
  private _sprint: number = 30;
  private _rest: number = 90;
  private _cooldown: number = 240;
  private wakeLock: any = null;
  private fullScreenElement: HTMLElement | null = null;

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

  public async start(): Promise<void> {
    try {
      if ('wakeLock' in navigator && navigator.wakeLock !== undefined) {
        this.wakeLock = await navigator.wakeLock.request('screen');
        console.log('Screen Wake Lock activated.');
      }
    } catch (err) {
      console.error(`Failed to activate Screen Wake Lock: ${(err as Error).message}`);
    }

    this.fullScreenElement = document.documentElement;

    if (this.fullScreenElement.requestFullscreen) {
      this.fullScreenElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      console.log('Full Screen API is not supported by this browser.');
    }

    await this.router.navigateByUrl("/workout");
  }

  public async stop(): Promise<void> {
    if (this.wakeLock !== null) {
      await this.wakeLock.release();
      this.wakeLock = null;
      console.log('Screen Wake Lock released.');
    }

    if (document.exitFullscreen) {
      document.exitFullscreen().catch((err) => {
        console.error(`Error attempting to disable full-screen mode: ${err.message} (${err.name})`);
      });
    }

    await this.router.navigateByUrl("/config");
  }
}
