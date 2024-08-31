#!/bin/bash
cp /opt/openfc/openfc-auth-root.policy /usr/share/polkit-1/actions/openfc-auth-root.policy
systemctl restart polkit.service
