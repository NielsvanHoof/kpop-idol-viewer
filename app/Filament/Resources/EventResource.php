<?php

namespace App\Filament\Resources;

use App\Enums\EventTypes;
use App\Filament\Resources\EventResource\Pages;
use App\Models\Event;
use App\Models\Group;
use App\Models\Idol;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\MorphToSelect;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables\Actions\BulkActionGroup;
use Filament\Tables\Actions\DeleteAction;
use Filament\Tables\Actions\DeleteBulkAction;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Actions\ForceDeleteAction;
use Filament\Tables\Actions\ForceDeleteBulkAction;
use Filament\Tables\Actions\RestoreAction;
use Filament\Tables\Actions\RestoreBulkAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\TrashedFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class EventResource extends Resource
{
    protected static ?string $model = Event::class;

    protected static ?string $slug = 'events';

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Basic Details')
                    ->icon('heroicon-o-information-circle')
                    ->schema([
                        TextInput::make('name')
                            ->label('Event Name')
                            ->required()
                            ->placeholder('Enter event name'),

                        Select::make('type')
                            ->label('Type')
                            ->options(EventTypes::class)
                            ->placeholder('Select type')
                            ->required()
                            ->searchable()
                            ->preload()
                            ->native(false),
                        TextInput::make('location')
                            ->label('Location')
                            ->hint('Enter coordinates (latitude,longitude)')
                            ->afterStateHydrated(function (TextInput $component, ?array $state) {
                                if ($state) {
                                    $component->state(implode(',', [$state['lat'], $state['lng']]));
                                }
                            })
                            ->beforeStateDehydrated(function (?string $state, callable $set) {
                                if ($state) {
                                    [$lat, $lng] = explode(',', $state);
                                    $set('location', ['lat' => (float) $lat, 'lng' => (float) $lng]);
                                }
                            }),

                        DatePicker::make('date')
                            ->label('Date')
                            ->placeholder('Select date'),

                        TextInput::make('venue')
                            ->label('Venue')
                            ->placeholder('Enter venue name'),
                    ])
                    ->collapsible(),

                Section::make('Associations')
                    ->icon('heroicon-o-link')
                    ->schema([
                        MorphToSelect::make('eventable')
                            ->types([
                                MorphToSelect\Type::make(Idol::class)
                                    ->titleAttribute('name')
                                    ->label('Idol'),
                                MorphToSelect\Type::make(Group::class)
                                    ->titleAttribute('name')
                                    ->label('Group'),
                            ])
                            ->label('Associated Entity')
                            ->searchable()
                            ->preload()
                            ->required(),
                    ])
                    ->collapsible()
                    ->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('date')
                    ->date(),

                TextColumn::make('venue'),
            ])
            ->filters([
                TrashedFilter::make(),
            ])
            ->actions([
                EditAction::make(),
                DeleteAction::make(),
                RestoreAction::make(),
                ForceDeleteAction::make(),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                    RestoreBulkAction::make(),
                    ForceDeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListEvents::route('/'),
            'create' => Pages\CreateEvent::route('/create'),
            'edit' => Pages\EditEvent::route('/{record}/edit'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->withoutGlobalScopes([
                SoftDeletingScope::class,
            ]);
    }

    public static function getGloballySearchableAttributes(): array
    {
        return ['name'];
    }
}
