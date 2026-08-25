---
title: "raspberrypi"
image:
image_small:
excerpt: ""
---

## Set up wifi

If you're setting up your wifi from an SD card you can add the following in `/wpa_supplicant.conf` (along with a blank `ssh` file to enable ssh). Otherwise add it to `/etc/wpa_supplicant/wpa_supplicant.conf`:

```
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
country=US

network={
  ssid="ATT69696969"
  psk="password"
  key_mgmt=WPA-PSK
}
```

You can add multiple `network` blocks for multiple networks. You can encrypt your `psk` with `wpa_passphrase [ssid-name] [password-name]`.
