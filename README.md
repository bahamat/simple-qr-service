# simple-qr-service

This is an extremely simple and small QR generator web site and service.

## Install

    git clone https://github.com/bahamat/simple-qr-service
    cd simple-qr-service
    make all

If you're using this on illumos, you can import this as an SMF service

    make install

On other operating systems, just run `server.js`. Setting up system services
is an exercise left up to you.

Anything else beyond the usage below is outside the scope of this project, but
you can put it behind Nginx, Apache, or whatever for things like TLS or
caching.


## Web Usage

Navigate to the web page, enter some text in the form and it'll give you the
QR code. The included `html/qr.html` can be used as an example of embedding
this in a web page.

## API usage

### /qr/:text

* `:text` - The text to be rendered into a QR code. The text should be URL
  encoded.

This will return a PNG object of the QR code. External web sites can link
directly to a QR or use JavaScript magickry to render it dynamically.

## TODO

* Change to the async
* Configurable listen socket
* Bunyan logging
