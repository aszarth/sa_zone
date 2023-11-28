# intro

get zones like city id, street id, street name from a gtasa coord (a player, a bizz, a house, anything u got the pos) and use it to use less CPU

# diff between sa_zone and a_zone
based on original lib samp `a_zone`:
https://github.com/metropolitancityrpg/a_zone (idk the original repo, sampforum is off)

its similar to a_zone with more functions and also using lighter because:
- street lists are separated by city
- big cities with a lot of streets (LS,LV,SF) are divided in two list: WEST and EAST lists

# functions to use

- GetPosCityId(Float:x, Float:y)
- GetPosStreetId(stateid, Float:x, Float:y)
- GetPosStreetName(stateid, cityid)
- GetMainCityFromCityId(cityid)

## player funcs and global vars

- UpdatePlayerSaZoneLocation(playerid, GETTIME);
- GetPlayerLocation(playerid, bool:force_update_now)

new player_city_id[MAX_PLAYERS];
new player_street_id[MAX_PLAYERS];
new PlayerLastZoneName[MAX_PLAYERS][MAX_ZONE_NAME];

## limits
`#define MAX_CITIES`

# source tools
- script to order a list by lat/long and to split west/east: `sa_zone-orderlist.js`

# use example 1

make your checks lighter, instead of check: range, positions (that are heavier) in a loop
check if player/player, player/bizz, player/house, anything/anything are at the same city and same street
its just a int check
```c++
// update player location force now
GetPlayerLocation(playerid, true);
// check a drop pos for example
for(new i = 0; i < sizeof(DropInfo); i++) {
    if(DropInfo[i][dropStateId] != player_street_id[playerid]) continue;
    if(DropInfo[i][dropCityId] != player_city_id[playerid]) continue;
    if(IsPlayerInRangeOfPoint(playerid, 1.0, DropInfo[i][dropPosX], DropInfo[i][dropPosY], DropInfo[i][dropPosZ]))
    {
```

# use example 2

or just use to show the street name in a textdraw with a light code (instead of loop to the whole list)
```c++
// update player location with delay
GetPlayerLocation(playerid, false);
new str[128];
format(str, sizeof(str), "%s", PlayerLastZoneName[playerid]);
PlayerTextDrawSetString(playerid, streetNameTD[playerid], str);
```

# use example 3

or even better create a list of stuff at the same city and loop on it, instead of loop the whole list
```c++
// make your own iterators example
new Iterator:BizzInState_List[MAX_CITIES]<MAX_BIZZ>;

Iter_Add(BizzInState_List[stateid], bizzid);

BizzInfo[bizzid][bizzStateId] = GetPosStateId(BizzInfo[bizzid][bizzX], BizzInfo[bizzid][bizzY]);
BizzInfo[bizzid][bizzCityId] = GetPosCityId(BizzInfo[bizzid][bizzStateId], BizzInfo[bizzid][bizzX], BizzInfo[bizzid][bizzY]);
Iter_Add(BizzInState_List[stateid], bizzid);

// so you can loop into small lists
foreach (new bizzid : BizzInState_List[player_street_id[playerid]]) {}

// instead of
for(new bizzid = 1; bizzid < MAX_BIZZ; bizzid++) {}

```
