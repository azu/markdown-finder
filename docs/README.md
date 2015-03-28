## CSS Architecture

Based:

- http://suitcss.github.io/
- https://github.com/cssnext/cssnext

## Naming Rules

- `XyzComponent` is **Component**.
    - Component has scope styles.
- `c` is **container** prefix.
    - **Container** is wrapper of **Component**.
- `l` is **layout** prefix.
    - **layout** is utility class.
    - **layout** could used anywhere(inside/outside of **Component**/**Container**).