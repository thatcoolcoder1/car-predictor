import pandas as pd
import joblib
from sklearn.linear_model import Lasso
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score, mean_squared_error

data = pd.read_csv("data/car_data.csv")

features = [c for c in data.columns if c not in ("sp", "Year")]

X = data[features]
y = data["sp"]          
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42
)

lasso_model = make_pipeline(StandardScaler(), Lasso(alpha=0.59))
lasso_model.fit(X_train, y_train)

y_pred = lasso_model.predict(X_test)
print("MSE:", mean_squared_error(y_test, y_pred))
print("R2:", r2_score(y_test, y_pred))
print("Features:", features)

joblib.dump(lasso_model, "model.joblib")