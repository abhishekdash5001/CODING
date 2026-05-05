1. next/image creates srcset, so the browser can decide which image size to load based on device/screen size. This helps keep images smaller on small devices.

2. width and height are important/mandatory in many cases because they help Next.js reserve space for the image, which improves CLS.

3. sizes tells the browser how much width the image will take based on screen width.

4. fill makes the image take the entire available space of the parent container.

5. object-cover can be used when the image should fill the box, even if some part gets cropped.

6. object-contain can be used when the full image should be visible, even if empty space appears.

7. quality prop can be used to control the quality/file size of the image.

8. For statically imported images, Next.js can automatically detect width, height, and aspect ratio.

9. By default, images are lazy-loaded.

10. To improve LCP for important above-the-fold images, we can use preload / fetch priority high.

11 Blur

## loading ='lazy' i will bring the order when customer is near
## lading ='eager' i get the order lets not delay start cooking food
## preload = order is going to come better start cooking
## fetch prioery high - order from vip lets make this first then others

## next js can convert jpg to webp so it doesnot changet he orginal file but the served version

