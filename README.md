# Mantine-collapse-issue Branch

## How to use this branch?

1. Clone this

```
git clone https://github.com/Gu-Miao/react-admin -bmantine-collapse-issue --depth 1
```

2. Install packages

```
npm ci
```

3. Start devserver

```
npm start
```

Visit http://localhost:5000 to see the page.

4. Let the issue reappear

First, open the collapse items and active a third level menu item.

Then refresh the browser.

After that, collapse the thrid level menu item and you will find that the second level collapse component content has a fixed height so that the element lost its ability of self-adaption.

## Key Code 

* src/routes.tsx
* src/components/Layout/AppNavbar/NavbarMenu.tsx
* src/components/CollapseItem/CollapseItem.tsx