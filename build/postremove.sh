#!/bin/bash
rm /usr/share/polkit-1/actions/openfc-auth-root.policy
systemctl restart polkit.service
