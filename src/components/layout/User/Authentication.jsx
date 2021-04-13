import React, { useState, useEffect } from "react";
import { UserManager } from "oidc-client";
import { Menu } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import {authenticateUser, authenticateUserBegin} from '../../../redux/actions/actions'

export default function Authentication() {
  const [fullName, setUserName] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const rootUrl = "http://localhost:8080/";
    const settings = {
      resource: "ITARWebApi",
      authority: "https://syst-fs1.danskebank.com/adfs/",
      client_id: "b5accac7-9010-46a1-9904-0b99ab89a2bc",
      popup_redirect_uri: rootUrl + "popup.html",
      silent_redirect_uri: rootUrl + "silent.html",
      response_type: "id_token token",
      scope: "openid", // openid profile email name scope user_impersonation allatclaims',
      loadUserInfo: false, //removed to avoid CORS issue
      filterProtocolClaims: false,
      automaticSilentRenew: true,
      metadata: {
        issuer: "https://syst-fs1.danskebank.com/adfs",
        authorization_endpoint:
          "https://syst-fs1.danskebank.com/adfs/oauth2/authorize/",
        token_endpoint: "https://syst-fs1.danskebank.com/adfs/oauth2/token/",
        userinfo_endpoint: "https://syst-fs1.danskebank.com/adfs/userinfo",
        jwks_uri: "https://syst-fs1.danskebank.com/adfs/discovery/keys"
      },
      signingKeys: [
        {
          kty: "RSA",
          use: "sig",
          alg: "RS256",
          kid: "LhHARygu321J_QXRU08osLcUPqk",
          x5t: "LhHARygu321J_QXRU08osLcUPqk",
          n:
            "tbhs1dalhvK9ged8EfjEl8KuwSvVdbmHNJjUGfj7-E9BLBYqTuFnP6B7aMdRajWikuKLwzGi_c1hrFX9g7_bN5kx2ER0IZBfoyLTgxmxLONAPvotKLsKMK7Qh9T5CRCL2U1qgtIIsCsi6gi89YnPmu9Xd85ZcFLTXfQF9_ZS6g8PI0KayEpbHYxF1Gzolft7xzM4sJCOYXTcEcFS8zZWJVqKek0SxIVs72FSjWmchrPs2dD4AHggpG_k954p95DLLgcIKFyKEOni3bx75DNN62lJ-h7YDbjW6VpmII-1PAjZUvCfQWTu3oX7YKR-VqqgBL-nWsjFA1YbikWOkq4-tQ",
          e: "AQAB",
          x5c: [
            "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"
          ]
        }
      ]
    };

    if (!fullName) {
      dispatch(authenticateUserBegin())
      const manager = new UserManager(settings);
      manager.events.addUserLoaded(user => {
        //console.log(user);
        const tokenPayload = JSON.parse(atob(user.access_token.split(".")[1]));
        setUserName(tokenPayload.unique_name);
        dispatch(authenticateUser(tokenPayload.unique_name))
      });
      manager.signinSilentCallback();
      manager.signinSilent();
    }
  });

  return <Menu.Item name={fullName} />;
}
