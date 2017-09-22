import React from "react";
import ReactDOM from "react-dom";

import Layout from "./components/Layout";


window.onload = function() {
	const app = document.getElementById(INTERACTIVE_TRANSCRIPT_CONFIG.mountId);
	ReactDOM.render(<Layout videoId={INTERACTIVE_TRANSCRIPT_CONFIG.videoId} />, app);
}