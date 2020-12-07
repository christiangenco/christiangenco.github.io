---
title: How to reset your Ghost password
image: 
description: 
---

This method works even if you have a borken email setup. It's adapted from http://www.electricsh.net/changing-your-ghost-admin-password-with-sqlite3/

First, ssh into the server hosting Ghost and find the `ghost.db` file (should be in the `data/` directory).

Now enter the following commands one at a time (don't actually type `$` or `sqlite>`):

    $ sqlite3 ghost.db
    sqlite> UPDATE users SET password = '$2a$10$WkfyTiEgL0goeenDt3zJK.teDt1gCUgpfXIOguixNFrwzm/LYg74m';
    sqlite> .quit

This will reset your password to "password". Now you should be able to log in and change your password to something else!
