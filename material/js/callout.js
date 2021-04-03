		@import  "https://fonts.googleapis.com/css?family=Ubuntu+Mono";

		code {
			font-family: 'Ubuntu Mono',;
		}

		.large {
			font-size: 55px;
		}

		.callout-card {
			background: #fff;
			border: 1px solid #333;
			box-shadow: 0 10px 20px rgba(0,0,0,0.2);
			margin: 1rem 0;
			overflow: hidden;
		}

		.callout-card .card-label {
			border-color: transparent #333 transparent transparent;
			border-color: rgba(255,255,255,0) #333 rgba(255,255,255,0) rgba(255,255,255,0);
		}

		.callout-card.primary {
			border-color: #446cb3;
		}

		.callout-card.primary .card-label {
			border-color: transparent #446cb3 transparent transparent;
			border-color: rgba(255,255,255,0) #446cb3 rgba(255,255,255,0) rgba(255,255,255,0);
		}

		.callout-card.secondary {
			border-color: #adb2bd;
		}

		.callout-card.secondary .card-label {
			border-color: transparent #adb2bd transparent transparent;
			border-color: rgba(255,255,255,0) #adb2bd rgba(255,255,255,0) rgba(255,255,255,0);
		}

		.callout-card.info {
			border-color: #89c4f4;
		}

		.callout-card.info .card-label {
			border-color: transparent #89c4f4 transparent transparent;
			border-color: rgba(255,255,255,0) #89c4f4 rgba(255,255,255,0) rgba(255,255,255,0);
		}

		.callout-card.alert {
			border-color: #f22613;
		}

		.callout-card.alert .card-label {
			border-color: transparent #f22613 transparent transparent;
			border-color: rgba(255,255,255,0) #f22613 rgba(255,255,255,0) rgba(255,255,255,0);
		}

		.callout-card.success {
			border-color: #87d37c;
		}

		.callout-card.success .card-label {
			border-color: transparent #87d37c transparent transparent;
			border-color: rgba(255,255,255,0) #87d37c rgba(255,255,255,0) rgba(255,255,255,0);
		}

		.callout-card.warning {
			border-color: #f89406;
		}

		.callout-card.warning .card-label {
			border-color: transparent #f89406 transparent transparent;
			border-color: rgba(255,255,255,0) #f89406 rgba(255,255,255,0) rgba(255,255,255,0);
		}

		.callout-card .card-label {
			border-style: solid;
			border-width: 0 70px 70px 0;
			float: right;
			height: 0;
			width: 0;
			transform: rotate(360deg);
		}

		.callout-card .callout-card-content {
			padding: .5rem 1.5rem .875rem;
		}

		.callout-card.radius {
			border-radius: .6rem;
		}

		.callout-card .label-text {
			color: #fff;
			font-size: 1.65rem;
			font-weight: 700;
			position: relative;
			right: -40px;
			top: 8px;
			white-space: nowrap;
			/* transform: rotate(45deg); */
		}
	