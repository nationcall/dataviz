import pandas as pd 
import matplotlib.pyplot as plt
import numpy as np 
#df = pd.read_json(open('data/nobel_winners_cleaned.json'))
#df.groupby('country').size().sort_values(ascending=False).plot(kind='bar',figsize=(12,4))

df = pd.read_json(open('data/nobel_winners_cleaned.json'))
df_countries = pd.read_json('data/winning_country_data.json',orient='index')
df_countries = df_countries.set_index('name')
nat_group = df.groupby('country')
ngsz = nat_group.size()
df_countries['nobel_wins'] = ngsz
df_countries['nobel_wins_per_capita'] = df_countries.nobel_wins/df_countries.population
#print(df_countries.columns)

# ax = df_countries[df_countries.nobel_wins>2].sort_values(by='nobel_wins_per_capita',ascending=True).nobel_wins_per_capita.plot(kind='barh',figsize=(5,10),title="Relative prize numbers")
# ax.set_xlabel("Nobel prize per capita")
# ax.set_facecolor("#eee")
# plt.tight_layout()
# plt.savefig("country_relative_prize_numbers.png")

# ax = df_countries[df_countries.nobel_wins>2].sort_values(by='nobel_wins',ascending=True).nobel_wins.plot(kind='barh',figsize=(5,10),title="Absolute prize numbers")
# ax.set_xlabel("Nobel prize numbers")
# ax.set_facecolor("#eee")
# plt.tight_layout()
# plt.savefig("country_absolute_prize_numbers.png")

# new_index = pd.Index(np.arange(1901,2015),name='year')
# by_year_nat_sz = df.groupby(['year','country']).size().unstack().fillna(0)

# regions = [{
# 			'label':'N.America',
# 			'countries':['United States','Canada']
# 			},
# 			{
# 			'label':'Europe',
# 			'countries':['United Kingdom','Germany','France']
# 			},
# 			{'label':'Asia','countries':['Japan','Russia','India']}
# 			]
# for region in regions:
# 	by_year_nat_sz[region['label']] = by_year_nat_sz[region['countries']].sum(axis=1)

# df_regions=by_year_nat_sz[[r['label'] for r in regions]].cumsum()

# import plotly.express as px
# # fig=px.line(df_regions,labels={'country':'Regions'},line_dash='country',line_dash_sequence=['solid','dash','dot'])
# # fig.show()

# # import plotly.graph_objs as go 
# # traces=[]
# # for region in regions:
# # 	name = region['label']
# # 	traces.append(go.Scatter(x=df_regions.index,
# # 							y=df_regions[name],
# # 							name=name,
# # 							mode="lines",
# # 							hovertemplate=f"{name}<br>%{{x}}<br>$%{{y}}<extra></extra>",
# # 							line=dict(dash=['solid','dash','dot'][len(traces)])))
# # layout = go.Layout(height=600,width=600,xaxis_title="year",yaxis_title="cumulative prizes")
# #fig = go.Figure(traces,layout)
# #fig.show()

# df_country_category = df.groupby(['country','category']).size().unstack()
# df_country_category['Total'] = df_country_category.sum(1)
# df_country_category.head(3)

# df_country_category = df_country_category.loc[df_country_category.Total>2].copy()
# from geopy.geocoders import Nominatim

# geolocator = Nominatim(user_agent="nobel_prize_app",scheme='http')
# lats={}
# lons={}
# for name in df_country_category.index:
# 	location = geolocator.geocode(name)
# 	if location:
# 		lats[name] = location.latitude
# 		lons[name] = location.longitude
# 	else:
# 		print("No coords for %s"%name)
# 	#print("Name: ",name)
# 	#print("Coords: ",(location.latitude,location.longitude))
# 	#print("Raw details: ",location.raw)
# df_country_category.loc[:,'Lat'] = pd.Series(lats)
# df_country_category.loc[:,'Lon'] = pd.Series(lons)

# def calc_marker_radius(size,scale=5):
# 	return np.sqrt(size/np.pi)*scale

# size = df_country_category['Total'].apply(calc_marker_radius,args=(16,))
# #fig = px.scatter_mapbox(df_country_category,lat="Lat",lon="Lon",
# #						hover_name=df_country_category.index,
# #						hover_data=['Total'],
# #						color_discrete_sequence=["olive"],
# #						zoom=0.7,size=size)
# #fig.update_layout(mapbox_style="carto-positron",width=800,height=450)
# #fig.update_layout(margin={"r":0,"t":0,"l":0,"b":0})
# #fig.show()

df_select = df[['gender','award_age']]
df_select.to_json('nobel_winners.json',orient='records')




















