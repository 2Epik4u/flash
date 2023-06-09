# How to get Adobe Flash Player on linux
This tutorial is mostly for [Flashthemes](https://flashthemes.net).

# Get Started
First, Install flash player. You can do this by installing it through the [Aur package](https://aur.archlinux.org/packages/pepper-flash) or if you cant find it through your package manager, check the flashbuilds folder
Next, install a chromium build that is under chromium 88. You will need to disable the sandbox or else chrome wont load webpages.
You will also need to specify the ``--ppapi-flash-path`` or it will not load flashplayer.
```
./chrome --no-sandbox --ppapi-flash-path=/usr/lib/PepperFlash/libpepflashplayer.so
```
( replace chrome with the file name if on the appimage version )

