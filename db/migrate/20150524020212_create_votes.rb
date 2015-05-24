class CreateVotes < ActiveRecord::Migration
  def change
    create_table :votes do |t|
      t.belongs_to :voter, index: true
      t.belongs_to :candidate, index: true
      t.integer :place
    end
    add_foreign_key :votes, :voters
    add_foreign_key :votes, :candidates
  end
end
