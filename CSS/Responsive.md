# Adaptive Design is like have separte layout for mobile and tab and desktop
# Responsive Design is like same layour will squueze spand to fit thte design




# Why is meta viewport important?  without this  mobile will think this dekstop view 

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">

```

 content="width=device-width  --> width of device
 initial-scale=1.0  zoom



 ## Mobile FIrst liek fist we will first creae for mobile then move to tab and then desktop and we write mob tab and then deskopt bcz css is red top to bottom to ovoid overiidng
 ## In mobile-first, we start with mobile styles and then use min-width media queries for tablet and desktop. In desktop-first, we start with desktop styles and then use max-width media queries for tablet and mobile.
 ```css

 //Mobile

 .box {
  font-size: 14px;
}

@media (min-width: 768px) {
  .box {
    font-size: 16px;
  }
}

@media (min-width: 1024px) {
  .box {
    font-size: 18px;
  }
}

//Desktop
.box {
  font-size: 18px;
}

@media (max-width: 1024px) {
  .box {
    font-size: 16px;
  }
}

@media (max-width: 768px) {
  .box {
    font-size: 14px;
  }
}

 ```


 ```css
/**This means: apply these styles when the screen width is 768px or less. */
@media (max-width: 768px) {
  .box {
    width: 100%;
  }
}

 ```

 ## Should breakpoints be based on devices or content layout? - content/laoyut not device specif ther is lot of deive and if do this then maintinace will be tough


## What are common breakpoints used in projects?
```html
There is no fixed rule, but common breakpoints are often around:

480px → small mobile
768px → tablet
1024px → small laptop
1280px or 1440px → large desktop


```


# Why should we avoid fixed widths in responsive design?

```html

fix width will add horizontal sxcrool in small deive isntause flex grid that can srink and expand



```

# Difference between px, %, em, rem, vw, vh

```html

px is fixed
% relative to parent
em uses it own font-size or parent   thats the reason it gets compouned in nested child
rem - is root fi=ont size


<style>
    .a{
        font-size:20px
        padding:2em // 40pc

}

    </style>

```


## max-width It makes sure the image never becomes wider than its parent container.

## Normal content image: use max-width: 100% and height: auto, so the image stays inside its parent and keeps its aspect ratio.

## Image inside a fixed-size box/card: use width: 100%, height: 100%, and object-fit: cover, so the box is fully filled, aspect ratio stays correct, and some part may be cropped.

 ## If you want the whole image visible inside that fixed box: use object-fit: contain, so aspect ratio stays correct, the whole image shows, but empty gaps may remain.


 ## What does flex: 1 mean?

 ```css

flex-grow: 1;
flex-shrink: 1;
flex-basis: 0;

 ```


 ## What does repeat(auto-fit, minmax(200px, 1fr)) do?
  create as many columns that cat fit with minium width of 200px and can grow upto 1fr to share the remaining space 


  # auto fill does fit as many columnsasit can but space is remaing it will leave the sapce
  # auto fit fit as may as can but expands to tanke the sape aviable  (heps less use of media quieres)

  ```css
grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
| item1 | item2 | item3 | empty |

grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));

|     item1     |     item2     |     item3     |

  ```


  # long text in small screen over-flow :break-word  first ries to wrap it possible then break it but word-break:brea-all is more agressive


  #  font-size: clamp(1rem, 2vw, 2rem);

  