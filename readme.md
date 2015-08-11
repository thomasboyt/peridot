goals:

* load yaml file for entries like

```yaml
- title: 'Vince Staples'
  location: 'The Shop'
  date: '08/10/15'
  description: >
    This show owned.
  tweets:
    - https://twitter.com/thomasABoyt/status/630870421420797952
    - https://twitter.com/thomasABoyt/status/630884636407820288
    - https://twitter.com/thomasABoyt/status/630885378841530368
    - https://twitter.com/thomasABoyt/status/630934819103506433
    - https://twitter.com/thomasABoyt/status/630945325960839168
    - https://twitter.com/thomasABoyt/status/630969980507525120
```

* fetch tweets and render their media and text
* build a post at a time, then render into paginated list
* build files into _output/
