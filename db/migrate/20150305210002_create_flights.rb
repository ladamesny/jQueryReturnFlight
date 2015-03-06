class CreateFlights < ActiveRecord::Migration
  def change
    create_table :flights do |t|
      t.string :destination
      t.integer :flight_no
      t.timestamps
    end
  end
end
