import React from "react";
import { Translation } from "react-i18next";

const NoChatSelected = (props) => {
  return (
    <Translation>
      {(t) => (
        <div className="chatSide">
          <div className="chatSide__header"></div>
          <div className="ChatContent">
            <div className="chatSide__body">
              <div className="chatSide__no_message">
                <div className="chatSide__nomessage__card">
                  <h2>{t("no_chat_title")}</h2>
                  <p>{t("no_chat_desc")}</p>
                </div>
              </div>
            </div>
            {/* div footer */}
            <div className="chatSide__footer"></div>
          </div>
        </div>
      )}
    </Translation>
  );
};

export default NoChatSelected;