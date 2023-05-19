import pandas as pd 
import matplotlib.pyplot as plt
#df = pd.read_json(open('data/nobel_winners_cleaned.json'))
#df.groupby('country').size().sort_values(ascending=False).plot(kind='bar',figsize=(12,4))

df = pd.read_json(open('data/nobel_winners_cleaned.json'))
df_countries = pd.read_json('data/winning_country_data.json',orient='index')
df_countries = df_countries.set_index('name')
nat_group = df.groupby('country')
ngsz = nat_group.size()
df_countries['nobel_wins'] = ngsz
df_countries['nobel_wins_per_capita'] = df_countries.nobel_wins/df_countries.population
print(df_countries.columns)

ax = df_countries[df_countries.nobel_wins>2].sort_values(by='nobel_wins_per_capita',ascending=True).nobel_wins_per_capita.plot(kind='barh',figsize=(5,10),title="Relative prize numbers")
ax.set_xlabel("Nobel prize per capita")
ax.set_facecolor("#eee")
plt.tight_layout()
plt.savefig("country_relative_prize_numbers.png")