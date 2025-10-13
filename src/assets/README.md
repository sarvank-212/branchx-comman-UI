# Assets Folder - Images and Logo Guide

## 📁 Folder Structure
```
src/
  assets/
    images/
      placeholder-logo.svg    # Blue circular logo placeholder
      company-logo.svg       # Red circular company logo placeholder
```

## 🖼️ How to Use Images

### Option 1: Use SVG Placeholder (Currently Active)
The `placeholder-logo.svg` is currently being used in the SideMenu component.

### Option 2: Use Company Logo Placeholder
To use the company logo placeholder, update the JSX:
```jsx
<div className="menu-logo company-logo">LOGO</div>
```

### Option 3: Use Your Own Image
1. Add your image file to `src/assets/images/`
2. Update the CSS class in `SideMenu.css`:
```css
.menu-logo.your-logo {
  background-image: url('../assets/images/your-logo.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
```
3. Update the JSX:
```jsx
<div className="menu-logo your-logo">LOGO</div>
```

## 🎨 Logo Specifications
- **Recommended size**: 60x60px or larger
- **Format**: PNG, JPG, or SVG
- **Shape**: Will be displayed in a circular container
- **Background**: Transparent or matching the design

## 📝 Customization
To change the logo appearance, modify the `.menu-logo` class in `SideMenu.css`:
- `width` and `height` for size
- `border-radius` for shape
- `border` for border styling
- `box-shadow` for glow effects
