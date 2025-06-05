import { makeAutoObservable, observable, runInAction } from "mobx";

export default class MainStore {

    count: number = 1;

    ports: SerialPort[] = [];
    selectedPort: SerialPort | null = null;
    isPermissionGranted = false;
    error: string | null = null;
    isConnecting = false;

    constructor()
    {
        makeAutoObservable(this, {
            count: observable
        });
    }

 async requestPermission() {
    try {
      this.isConnecting = true;
      this.error = null;
      
      // Запрашиваем доступ к портам
      const port = await navigator.serial.requestPort();
      
      runInAction(() => {
        this.selectedPort = port;
        this.isPermissionGranted = true;
        this.isConnecting = false;
      });
      
      await this.listPorts();
    } catch (err) {
      runInAction(() => {
        this.error = err instanceof Error ? err.message : String(err);
        this.isConnecting = false;
      });
    }
  }

  async listPorts() {
    try {
      const ports = await navigator.serial.getPorts();
      runInAction(() => {
        this.ports = ports;
      });
    } catch (err) {
      runInAction(() => {
        this.error = err instanceof Error ? err.message : String(err);
      });
    }
  }

  async openPort(port: SerialPort) {
    try {
      this.isConnecting = true;
      await port.open({ baudRate: 115200 });
      runInAction(() => {
        this.selectedPort = port;
        this.isConnecting = false;
      });
    } catch (err) {
      runInAction(() => {
        this.error = err instanceof Error ? err.message : String(err);
        this.isConnecting = false;
      });
    }
  }

  async closePort() {
    if (this.selectedPort) {
      try {
        await this.selectedPort.close();
        runInAction(() => {
          this.selectedPort = null;
        });
      } catch (err) {
        runInAction(() => {
          this.error = err instanceof Error ? err.message : String(err);
        });
      }
    }
  }
}