class CreateVoters < ActiveRecord::Migration
  def change
    create_table :voters do |t|
      t.string :name
      t.string :googleID
      t.string :email
    end
  end
end
