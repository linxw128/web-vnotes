
### Core Setting
in *http block*
``` shell 
	map $http_x_gray $backend {
	    default "production_server";  # 默认走生产
	    "true"  "gray_server";        # 带灰度头
	}

	upstream production_server {
	      server 127.0.0.1:81;
	}

	upstream gray_server {
	      server 127.0.0.1:82;
	}
```

*proxy_pass* setting
```
proxy_pass http://$backend;
```

### authserver example
```shell
	map $http_x_portal_gray $portal_backend {
	    default "production_portal_server";  # 默认走生产
	    "true"  "gray_portal_server";        # 带灰度头
	}

	upstream production_portal_server {
	      server 10.20.20.76;
	}

	upstream gray_portal_server {
	      server 10.20.20.77;
	}
```

*proxy_pass* setting
```
proxy_pass http://$portal_backend;
```

use Edge modheader plugin

set header:
```
x-portal-gray: true
```