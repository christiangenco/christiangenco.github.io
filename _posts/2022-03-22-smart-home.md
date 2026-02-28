---
title: "Smart Home"
image:
image_small:
excerpt: ""
---

ZigBee is a wireless standard similar to WiFi or Bluetooth but [optimized for a high number of low-power nodes](https://youtu.be/A25ePoucSaU) at the sacrifice of speed, bandwidth (it only runs at 40kbps in the US), and range. ZigBee devices can run for years on a single button battery. It broadcasts at 906-924Mhz in the US.

There are [three types of Zigbee devices](https://www.youtube.com/watch?v=jqJ6xSVFEl8): coordinators (ZC), routers (ZR), and end devices (ZED). There's only ever one ZC in the network. ZRs relay signals from the ZEDs to the ZC and from the ZC to the ZEDs. ZEDs are only concerned with receiving messages only for them (not relaying messages) and sending messages to their parent node ZR so they use less power than ZRs.

You'll need to flash the firmware on your ZigBee device for optimal performance. The existing instructions for this are terrible and complicated though there are [some useful YouTube videos on how do it](https://youtu.be/4S_c_m6z-RY). I downloaded the recommended router firmware from [the zigbee2mqtt list of supported adapters](https://www.zigbee2mqtt.io/guide/adapters/#recommended) and extracted the `.hex` file. Next I cloned the [feature/ITead_Sonoff_Zigbee-delay branch of JelmerT's cc2538-bsl repository](https://github.com/JelmerT/cc2538-bsl/tree/feature/ITead_Sonoff_Zigbee-delay) and installed the dependencies with `python3 -m pip install pyserial intelhex` (before that I was getting weird `Requirement already satisfied` errors). Then I figured out the path of the USB device my ZigBee adapter was at with `ls /dev/tty.*` run before and after plugging it in (it was `/dev/tty.usbserial-2140`). Finally I ran JelmerT's cc2538-bsl python script with `python3 cc2538-bsl.py -p /dev/tty.usbserial-2140 -evw --bootloader-sonoff-usb CC1352P2_CC2652P_launchpad_coordinator_20211217.hex`.

Phew. There's [a cross-platform GUI app for flashing ZigBee device firmware](https://github.com/xyzroe/ZigStarGW-MT) that looks much easier to use than JelmerT's cc2538-bsl python script but I couldn't find a download link. I'm also not sure what exactly flashing the firmware does.

https://kinori.tech/blog/en/2021/11/19/install-and-run-zigbee2mqtt-on-your-mac/

```
brew install mosquitto
git clone --depth 1 https://github.com/Koenkk/zigbee2mqtt.git zigbee2mqtt
cd zigbee2mqtt && yarn

```

## What's possible?

## Ecosystem choices

## Zigbee Devices

## Set up antenna

## Set up Raspberry Pi Zigbee router

## Home Assistant vs. Custom Javascript

## MQTT Input and output in Javascript

- make a light toggle when a button is pushed

## Advanced MQTT Javascript Control
